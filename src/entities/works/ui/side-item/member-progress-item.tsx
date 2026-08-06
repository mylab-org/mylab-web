import { WorkMyProgress } from '@/entities/works'
import { Avatar } from '@/shared/ui/override/avatar'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'

export const MemberProgressItem = () => {
  return (
    <div className={'flex flex-col gap-5'}>
      <div className={'flex items-center gap-2.5'}>
        <Avatar src={'/test.png'} alt={'profile'} width={24} height={24} imgClassName={'rounded-full'}>
          <Text className={'text-[14px] font-bold md:text-[18px]'}>홍길동</Text>
        </Avatar>
        <div className={'flex gap-1'}>
          <Tag.Roll variant={'leader'} />
          <Tag.Roll variant={'doctoral'} />
        </div>
      </div>
      <WorkMyProgress />
    </div>
  )
}
