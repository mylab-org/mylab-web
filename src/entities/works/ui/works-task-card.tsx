'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/shared/lib'
import { formatDateWithWeekday } from '@/shared/lib/format'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'
import type { TaskListResponseType } from '../model/types'
import type { ReactNode } from 'react'

interface Props {
  task: TaskListResponseType
  moreMenu?: ReactNode
}

export const WorksTaskCard = ({ task, moreMenu }: Props) => {
  const { title, description, startAt, endAt } = task

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.taskId })

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
        'flex w-[250px] shrink-0 flex-col items-center gap-[10px] rounded-[12px] border-3 bg-white p-[10px] shadow-lg md:w-full md:gap-[20px] md:p-[20px]',
        isDragging ? 'relative z-0' : 'relative z-10',
        task.type === 'MEETING' ? 'border-red-500' : 'border-violet-500',
      )}
    >
      <div className={'flex w-full flex-col gap-1.25'}>
        <div className={'flex items-center justify-between gap-2.5'}>
          <Tag.WorkType type={task.type} />
          {moreMenu}
        </div>
        <h5 className={'text-[14px] font-semibold md:text-[18px]'}>{title}</h5>
      </div>
      <div className={'flex w-full flex-col gap-1.25'}>
        <Text className={'text-[10px] font-normal md:text-[14px]'}>
          {formatDateWithWeekday(startAt)} ~ {formatDateWithWeekday(endAt)}
        </Text>
        <Text className={'text-[10px] font-normal md:text-[14px]'}>{description}</Text>
      </div>
    </div>
  )
}
