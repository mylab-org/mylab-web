'use client'

import { useQuery } from '@tanstack/react-query'
import { CalendarDays, MapPin, Newspaper, UsersRound } from 'lucide-react'
import { WORKS_DETAIL_TAB } from '../../config/works-tab'
import { WorksMyProgress } from '@/entities/works'
import { getWorksPaperDetail } from '@/entities/works/api/get-works-paper-detail'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { TEST_LAB_ID } from '@/shared/constant/test'
import { formatDateWithWeekday, formatWorksDDay } from '@/shared/lib/format'
import { Tab } from '@/shared/ui/override/tab'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'

interface Props {
  paperId: number
}

export const WorkPaperDetail = ({ paperId }: Props) => {
  const {
    data: paper,
    isPending,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.PAPER.DETAIL(TEST_LAB_ID, paperId),
    queryFn: () => getWorksPaperDetail(TEST_LAB_ID, paperId),
  })

  if (isPending) return <div className={'px-5 lg:w-[750px] lg:px-7.5'}>Loading...</div>

  if (isError) return <div className={'px-5 lg:w-[750px] lg:px-7.5'}>논문 정보를 불러오지 못했습니다.</div>

  const { schedule, members, statusStep, totalSteps } = paper

  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 lg:w-[750px]'}>
      <section className={'flex flex-col gap-5 px-5 pb-2.5 lg:px-7.5'}>
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
        <WorksMyProgress statusStep={statusStep} totalSteps={totalSteps} />
      </section>
      <section className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 px-5 pb-5 lg:w-[750px] lg:px-7.5'}>
        <Tab tabs={WORKS_DETAIL_TAB} />
      </section>
    </div>
  )
}
