import { WorkMyProgress } from './work-my-progress'
import type { WORK_TYPE } from '@/shared/constant/tag'
import { cn } from '@/shared/lib'
import { Tag } from '@/shared/ui/tag'
import { Text } from '@/shared/ui/text'

interface WorkListItemProps {
  type?: keyof typeof WORK_TYPE
  className?: string
}

export const WorkListItem = ({ className, type = 'CONFERENCE' }: WorkListItemProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-[10px] md:w-[373px] md:flex-shrink-0', className)}>
      <div className={'flex flex-col gap-[5px]'}>
        <Tag.WorkType type={type} />
        <div className={'flex flex-col gap-[5px]'}>
          <div className={'flex items-center gap-[5px]'}>
            <Text className={'text-[14px] font-bold lg:text-[18px]'}>2025 한국통신학회 동계종합학술발표회</Text>
          </div>
          <div>
            <Text className={'text-[10px] font-normal lg:text-[14px]'}>
              2026.02.04(수)~2026.02.06(금), <b className={'font-bold'}>마감 D-24</b>
            </Text>
            <Text className={'text-[10px] font-normal lg:text-[14px]'}>모나 용평(용평리조트)</Text>
          </div>
        </div>
      </div>
      <div className={'flex flex-col gap-[5px]'}>
        <WorkMyProgress type={type} />
      </div>
    </div>
  )
}
