import { WorksMyProgress } from './works-my-progress'
import type { WORK_TYPE } from '@/shared/constant/tag'
import { cn } from '@/shared/lib'
import { formatDateWithWeekday, formatWorksDDay } from '@/shared/lib/format'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'
import type { TaskListResponseType, WorksPaperListResponseType } from '../model/types'

type Props = {
  className?: string
} & ({ paper: WorksPaperListResponseType; task?: never } | { task: TaskListResponseType; paper?: never })

const cardClassName = 'flex w-[280px] max-w-full shrink-0 flex-col md:w-[373px]'

export const WorksLabCard = ({ className, paper, task }: Props) => {
  const type = (task?.type ?? 'PAPER') as keyof typeof WORK_TYPE
  const title = task ? task.title : paper.title
  const statusStep = task ? task.statusStep : paper.statusStep
  const totalSteps = task ? task.totalSteps : paper.totalSteps
  const schedule = paper?.schedule

  return (
    <div className={cn(cardClassName, className)}>
      <div className={'flex min-h-0 flex-1 flex-col gap-1.25'}>
        <Tag.WorkType type={type} />
        <div className={'flex flex-col gap-1.25'}>
          <Text className={'line-clamp-1 text-[14px] font-bold lg:text-[18px]'}>{title}</Text>
          <div className={'flex min-h-[52px] flex-col gap-1.25 lg:min-h-[68px]'}>
            <Text className={'text-[10px] font-normal lg:text-[14px]'}>
              {task ? (
                <>
                  {formatDateWithWeekday(task.startAt)} ~ {formatDateWithWeekday(task.endAt)}
                </>
              ) : schedule ? (
                <>
                  {formatDateWithWeekday(schedule.startAt)}
                  {schedule.endAt && ` ~ ${formatDateWithWeekday(schedule.endAt)}`}
                  {schedule.dDay !== null && (
                    <>
                      , <b className={'font-bold'}>마감 {formatWorksDDay(schedule.dDay)}</b>
                    </>
                  )}
                </>
              ) : (
                '제출 학회 미정'
              )}
            </Text>
            {task ? (
              <Text className={'line-clamp-2 text-[10px] font-normal lg:text-[14px]'}>{task.description}</Text>
            ) : (
              <div className={'flex flex-col'}>
                <Text
                  className={cn('line-clamp-1 text-[10px] font-normal lg:text-[14px]', !schedule?.title && 'invisible')}
                >
                  {schedule?.title || 'placeholder'}
                </Text>
                <Text
                  className={cn(
                    'line-clamp-1 text-[10px] font-normal lg:text-[14px]',
                    !schedule?.location && 'invisible',
                  )}
                >
                  {schedule?.location || 'placeholder'}
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>
      <WorksMyProgress type={type} statusStep={statusStep} totalSteps={totalSteps} />
    </div>
  )
}
