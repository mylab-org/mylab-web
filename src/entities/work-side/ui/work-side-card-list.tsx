import { WorkMyProgress } from '@/entities/works'
import { Text } from '@/shared/ui'
import { Tag } from '@/shared/ui/tag'

export const WorkSideCardList = () => {
  return (
    <div className={'flex min-h-0 flex-1 flex-col gap-[30px] overflow-y-auto border-t border-t-gray-300 py-[20px]'}>
      <div className={'flex flex-col gap-[20px]'}>
        <div className={'flex items-center gap-[10px]'}>
          <div className={'h-[25px] w-[25px] rounded-full bg-gray-200'} />
          <Text className={'text-[14px] font-bold md:text-[18px]'}>홍길동</Text>
          <div className={'flex gap-[4px]'}>
            <Tag.Roll variant={'leader'} />
            <Tag.Roll variant={'doctoral'} />
          </div>
        </div>
        <WorkMyProgress />
      </div>
    </div>
  )
}
