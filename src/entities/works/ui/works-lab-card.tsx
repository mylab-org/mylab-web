import { WorksMyProgress } from './works-my-progress'
import type { WORK_TYPE } from '@/shared/constant/tag'
import { cn } from '@/shared/lib'
import { formatDateWithWeekday, formatWorksDDay } from '@/shared/lib/format'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'
import type { TaskListResponseType, WorksPaperListResponseType } from '../model/types'

interface Props {
  className?: string
  paper?: WorksPaperListResponseType
  task?: TaskListResponseType
  /** paper/task 없을 때 더미 카드용 */
  type?: keyof typeof WORK_TYPE
}

const cardClassName = 'flex h-full w-[280px] shrink-0 flex-col md:w-[373px]'

export const WorksLabCard = ({ className, paper, task, type = 'PAPER' }: Props) => {
  if (task) {
    return (
      <div className={cn(cardClassName, className)}>
        <div className={'flex min-h-0 flex-1 flex-col gap-1.25'}>
          <Tag.WorkType type={task.type} />
          <div className={'flex flex-col gap-1.25'}>
            <Text className={'line-clamp-1 text-[14px] font-bold lg:text-[18px]'}>{task.title}</Text>
            <div className={'flex min-h-[52px] flex-col gap-1.25 lg:min-h-[68px]'}>
              <Text className={'text-[10px] font-normal lg:text-[14px]'}>
                {formatDateWithWeekday(task.startAt)} ~ {formatDateWithWeekday(task.endAt)}
              </Text>
              <Text className={'line-clamp-2 text-[10px] font-normal lg:text-[14px]'}>{task.description}</Text>
            </div>
          </div>
        </div>
        <WorksMyProgress type={task.type} statusStep={task.statusStep} totalSteps={task.totalSteps} />
      </div>
    )
  }

  if (paper) {
    const { title, schedule, statusStep, totalSteps } = paper

    return (
      <div className={cn(cardClassName, className)}>
        <div className={'flex min-h-0 flex-1 flex-col gap-1.25'}>
          <Tag.WorkType type={'PAPER'} />
          <div className={'flex flex-col gap-1.25'}>
            <Text className={'line-clamp-1 text-[14px] font-bold lg:text-[18px]'}>{title}</Text>
            <div className={'flex min-h-[52px] flex-col gap-1.25 lg:min-h-[68px]'}>
              <Text className={'text-[10px] font-normal lg:text-[14px]'}>
                {schedule ? (
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
            </div>
          </div>
        </div>
        <WorksMyProgress type={'PAPER'} statusStep={statusStep} totalSteps={totalSteps} />
      </div>
    )
  }

  return (
    <div className={cn(cardClassName, className)}>
      <div className={'flex min-h-0 flex-1 flex-col gap-1.25'}>
        <Tag.WorkType type={type} />
        <div className={'flex flex-col gap-1.25'}>
          <Text className={'line-clamp-1 text-[14px] font-bold lg:text-[18px]'}>논문 제목</Text>
          <div className={'flex min-h-[52px] flex-col gap-1.25 lg:min-h-[68px]'}>
            <Text className={'text-[10px] font-normal lg:text-[14px]'}>
              2026.02.04(수)~2026.02.06(금), <b className={'font-bold'}>마감 D-24</b>
            </Text>
            <div className={'flex flex-col'}>
              <Text className={'line-clamp-1 text-[10px] font-normal lg:text-[14px]'}>
                2025 한국통신학회 동계종합학술발표회
              </Text>
              <Text className={'line-clamp-1 text-[10px] font-normal lg:text-[14px]'}>모나 용평(용평리조트)</Text>
            </div>
          </div>
        </div>
      </div>
      <WorksMyProgress type={type} />
    </div>
  )
}
