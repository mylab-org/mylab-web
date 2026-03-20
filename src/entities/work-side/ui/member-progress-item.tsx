import { WorkMyProgress } from '@/entities/works'
import { Tag } from '@/shared/ui/tag'
import { Text } from '@/shared/ui/text'

export const MemberProgressItem = () => {
  return (
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
  )
}
