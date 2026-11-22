'use client'

import { useLabWorkingHook } from '../../model/use-lab-working-hook'
import { WorksLabCard } from '@/entities/works'
import { Text } from '@/shared/ui/override/text'

const cardClassName = 'border-border rounded-[12px] border p-4 md:w-full'

export const SideWork = () => {
  const { papers, tasks, isPending, isError, isEmpty } = useLabWorkingHook()

  return (
    <div className={'flex h-full min-h-0 w-full flex-col gap-3.75 px-5 pb-5 lg:w-[750px] lg:px-7.5'}>
      <div className={'flex flex-1 flex-col gap-3.75 overflow-auto'}>
        {isPending ? (
          <Text className={'text-subtle-foreground py-5 text-center text-[14px]'}>업무를 불러오는 중입니다</Text>
        ) : isError ? (
          <Text className={'text-error! py-5 text-center text-[14px]'}>진행 중인 업무를 불러오지 못했습니다</Text>
        ) : isEmpty ? (
          <Text className={'text-subtle-foreground py-5 text-center text-[14px]'}>진행 중인 업무가 없습니다</Text>
        ) : (
          <>
            {papers.map(paper => (
              <WorksLabCard key={`paper-${paper.id}`} paper={paper} className={cardClassName} />
            ))}
            {tasks.map(task => (
              <WorksLabCard key={`task-${task.taskId}`} task={task} className={cardClassName} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
