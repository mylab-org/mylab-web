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
    opacity: isDragging ? 0.3 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'flex w-full cursor-pointer flex-col gap-3 rounded-[16px] border border-l-4 border-[#e2e3e5] bg-white p-3.5 shadow-sm md:min-h-[150px] md:p-4',
        isDragging ? 'relative z-0' : 'relative z-10',
        isEnd ? 'border-l-gray-300 bg-gray-50' : 'border-l-[#2562CD]',
        isDeadLine && 'border-l-error',
      )}
      onClick={() => openSideModal(detailComponent, title)}
    >
      <div className={'flex w-full flex-col gap-1.25'}>
        <div className={'flex items-center justify-between gap-2.5'}>
          <Tag.WorkType type={'PAPER'} />
        </div>
        <h5 className={'text-[14px] font-bold md:text-[17px]'}>{title}</h5>
        {schedule ? (
          <div className={'flex flex-col gap-1'}>
            <Text className={'text-[12px] font-normal md:text-[14px]'}>
              {formatDateWithWeekday(schedule.startAt)}
              {schedule.endAt && ` ~ ${formatDateWithWeekday(schedule.endAt)}`}
              {schedule.dDay !== null && (
                <>
                  , <b className={`font-bold ${isDeadLine && 'text-error'}`}>마감 {formatWorksDDay(schedule.dDay)}</b>
                </>
              )}
            </Text>
            <div>
              <Text className={'text-[12px] font-normal md:text-[14px]'}>{schedule.title}</Text>
              {schedule.location && (
                <Text className={'text-[12px] font-normal md:text-[14px]'}>{schedule.location}</Text>
              )}
            </div>
          </div>
        ) : (
          <Text className={'text-[12px] font-normal md:text-[14px]'}>제출 학회 미정</Text>
        )}
      </div>
      <div className={'flex w-full flex-wrap gap-2'}>
        {members.map(member => (
          <Tag.Member key={member.userId} name={member.name} />
        ))}
      </div>
    </div>
  )
}
