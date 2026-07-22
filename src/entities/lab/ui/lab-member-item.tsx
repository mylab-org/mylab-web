import { Avatar } from '@/shared/ui/override/avatar'
import { Tag } from '@/shared/ui/tag'
import { Text } from '@/shared/ui/text'

interface Props {
  children: React.ReactNode
}

export const LabMemberItem = ({ children }: Props) => {
  return (
    <div className={'flex items-center justify-between'}>
      <Avatar src={'/test.png'} alt={''} width={20} height={20} imgClassName={'rounded-full'}>
        <Text className={'text-[16px] leading-6 font-medium'}>{children}</Text>
      </Avatar>
      <div className={'flex gap-1'}>
        <Tag.Roll variant={'professor'} />
      </div>
    </div>
  )
}
