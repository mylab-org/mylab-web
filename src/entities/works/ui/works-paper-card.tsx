'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DEADLINE_WARNING_DAYS } from '../config/const'
import { cn } from '@/shared/lib'
import { formatDateWithWeekday, formatWorksDDay } from '@/shared/lib/format'
import { useSideModalStore } from '@/shared/store'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'
import type { WorksPaperListResponseType } from '../model/types'

interface Props {
  paper: WorksPaperListResponseType
  detailComponent: () => React.JSX.Element
}

export const WorksPaperCard = ({ paper, detailComponent }: Props) => {
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const { id, title, status, schedule, members } = paper

  const isEnd = status === 'COMPLETED'
  const isDeadLine = !isEnd && schedule?.dDay != null && schedule.dDay >= 0 && schedule.dDay <= DEADLINE_WARNING_DAYS

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    // ⚠️ 드래그 중일 때 원본을 아예 없애지 말고 0.3 정도로 유지하거나,
    // Overlay가 보일 수 있도록 아주 낮은 투명도를 줍니다.
    opacity: isDragging ? 0.3 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'flex cursor-pointer flex-col items-center gap-5 rounded-[12px] border-3 border-[#2B7FFF] p-2.5 shadow-lg md:min-h-[165px] md:p-5',
        isDragging ? 'relative z-0' : 'relative z-10',
        isEnd ? 'bg-gray-200' : 'bg-white',
        isDeadLine && 'border-error',
      )}
      onClick={() => openSideModal(detailComponent, title)}
    >
      <div className={'flex w-full flex-col gap-1.25'}>
        <div className={'flex items-center justify-between gap-2.5'}>
          <Tag.WorkType type={'PAPER'} />
          {/* {moreMenu} */}
        </div>
        <h5 className={'text-[14px] font-bold md:text-[18px]'}>{title}</h5>
        {schedule ? (
          <div className={'flex flex-col gap-1.25'}>
            <Text className={'text-[10px] font-normal md:text-[14px]'}>
              {formatDateWithWeekday(schedule.startAt)}
              {schedule.endAt && ` ~ ${formatDateWithWeekday(schedule.endAt)}`}
              {schedule.dDay !== null && (
                <>
                  , <b className={`font-bold ${isDeadLine && 'text-error'}`}>마감 {formatWorksDDay(schedule.dDay)}</b>
                </>
              )}
            </Text>
            <div>
              <Text className={'text-[10px] font-normal md:text-[14px]'}>{schedule.title}</Text>
              {schedule.location && (
                <Text className={'text-[10px] font-normal md:text-[14px]'}>{schedule.location}</Text>
              )}
            </div>
          </div>
        ) : (
          <Text className={'text-[10px] font-normal md:text-[14px]'}>제출 학회 미정</Text>
        )}
      </div>
      <div className={'flex w-full flex-wrap gap-2.5'}>
        {members.map(member => (
          <Tag.Member key={member.userId} name={member.name} />
        ))}
      </div>
    </div>
  )
}
