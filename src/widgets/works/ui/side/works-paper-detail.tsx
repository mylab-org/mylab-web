'use client'

import { useQuery } from '@tanstack/react-query'
import { CalendarDays, MapPin, Newspaper, UsersRound } from 'lucide-react'
import { useState } from 'react'
import { WORKS_DETAIL_TAB } from '../../config/works-tab'
import { WorksUpdatePaperModal } from '../modal/works-update-paper-modal'
import { useUsersMeHook } from '@/entities/user'
import { WorksMyProgress } from '@/entities/works'
import { getWorksPaperDetail } from '@/entities/works/api/get-works-paper-detail'
import type { WorksPaperDetailResponseType } from '@/entities/works/model/types'
import { WorksMoreMenu } from '@/features/works'
import { deleteWorksPaper } from '@/features/works/api/delete-works-paper'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { formatDateWithWeekday, formatWorksDDay } from '@/shared/lib/format'
import { useSideModalStore } from '@/shared/store'
import { Tab } from '@/shared/ui/override/tab'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'

interface Props {
  paperId: number
}

export const WorkPaperDetail = ({ paperId }: Props) => {
  const { me } = useUsersMeHook()
  const labId = me?.lab?.labId

  const {
    data: paper,
    isPending,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.PAPER.DETAIL(labId ?? 0, paperId),
    queryFn: () => getWorksPaperDetail(labId ?? 0, paperId),
    enabled: labId !== undefined,
  })

  const openSideModal = useSideModalStore(state => state.openSideModal)
  const closeSideModal = useSideModalStore(state => state.closeSideModal)
  const [isEditOpen, setIsEditOpen] = useState(false)

  if (isPending) return <div className={'px-5 lg:w-[750px] lg:px-7.5'}>Loading...</div>

  if (isError) return <div className={'px-5 lg:w-[750px] lg:px-7.5'}>논문 정보를 불러오지 못했습니다.</div>

  const { schedule, members, statusStep, totalSteps, leadAuthor } = paper
  const isLeadAuthor = me !== undefined && leadAuthor?.userId === Number(me.id)

  // 사이드 모달 헤더의 제목도 바뀐 제목으로 갱신
  const handleEditSuccess = (updatedPaper: WorksPaperDetailResponseType) => {
    setIsEditOpen(false)
    openSideModal(() => <WorkPaperDetail paperId={paperId} />, updatedPaper.title)
  }

  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 lg:w-[750px]'}>
      <section className={'flex flex-col gap-5 px-5 pb-2.5 lg:px-7.5'}>
        <div className={'flex items-start justify-between gap-2.5'}>
          <div className={'flex flex-col gap-2.5'}>
            {schedule && (
              <div className={'flex items-center gap-2.5'}>
                <CalendarDays strokeWidth={2} className={'size-5'} />
                <div className={'flex items-center gap-1.25'}>
                  <Text className={'text-[10px] font-medium md:text-[14px]'}>
                    {formatDateWithWeekday(schedule.startAt)}
                    {schedule.endAt && ` ~ ${formatDateWithWeekday(schedule.endAt)}`}
                  </Text>
                  {schedule.dDay !== null && (
                    <div className={'rounded-[8px] bg-gray-100 px-2.5 py-1.25 text-[10px] font-bold md:text-[12px]'}>
                      제출마감 {formatWorksDDay(schedule.dDay)}
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className={'flex items-center gap-2.5'}>
              <Newspaper strokeWidth={2} className={'size-5'} />
              <Text className={'text-[10px] font-medium md:text-[14px]'}>{schedule?.title ?? '제출 학회 미정'}</Text>
            </div>

            {schedule?.location && (
              <div className={'flex items-center gap-2.5'}>
                <MapPin strokeWidth={2} className={'size-5'} />
                <Text className={'text-[10px] font-medium md:text-[14px]'}>{schedule.location}</Text>
              </div>
            )}
            <div className={'flex items-center gap-2.5'}>
              <UsersRound strokeWidth={2} className={'size-5'} />
              <div className={'flex flex-wrap gap-2.5'}>
                {members.map(member => (
                  <Tag.Member key={member.userId} name={member.name} />
                ))}
              </div>
            </div>
          </div>
          {isLeadAuthor && (
            <WorksMoreMenu
              onEdit={() => setIsEditOpen(true)}
              deleteConfig={{
                mutationFn: () => deleteWorksPaper(labId ?? 0, paperId),
                confirmMessage: '정말 논문을 삭제하시겠습니까?',
                successMessage: '논문이 삭제되었습니다.',
                defaultErrorMessage: '논문 삭제에 실패했습니다.',
                invalidateQueryKeys: [QUERY_KEYS.PAPER.LIST(labId ?? 0)],
                onSuccess: () => closeSideModal(),
              }}
            />
          )}
        </div>
        <WorksMyProgress statusStep={statusStep} totalSteps={totalSteps} />
      </section>
      <section className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 px-5 pb-5 lg:w-[750px] lg:px-7.5'}>
        <Tab tabs={WORKS_DETAIL_TAB} />
      </section>
      <WorksUpdatePaperModal
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        paperId={paperId}
        title={paper.title}
        onSuccess={handleEditSuccess}
      />
    </div>
  )
}
