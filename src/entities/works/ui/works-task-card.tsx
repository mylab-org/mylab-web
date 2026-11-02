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
    opacity: isDragging ? 0.3 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'flex w-full flex-col gap-2.5 rounded-[16px] border border-l-4 border-[#e2e3e5] bg-white p-3.5 shadow-sm md:gap-3 md:p-4',
        isDragging ? 'relative z-0' : 'relative z-10',
        task.type === 'MEETING' ? 'border-l-red-400' : 'border-l-violet-400',
      )}
    >
      <div className={'flex w-full flex-col gap-1.25'}>
        <div className={'flex items-center justify-between gap-2.5'}>
          <Tag.WorkType type={task.type} />
          {moreMenu}
        </div>
        <h5 className={'text-[14px] font-semibold md:text-[17px]'}>{title}</h5>
      </div>
      <div className={'flex w-full flex-col gap-1'}>
        <Text className={'text-[12px] font-normal md:text-[14px]'}>
          {formatDateWithWeekday(startAt)} ~ {formatDateWithWeekday(endAt)}
        </Text>
        <Text className={'text-[12px] font-normal md:text-[14px]'}>{description}</Text>
      </div>
    </div>
  )
}
