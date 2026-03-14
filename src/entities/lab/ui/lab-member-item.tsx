import { Tag } from '@/shared/ui/tag'
import { Text } from '@/shared/ui/text'

interface Props {
  children: React.ReactNode
}

export const LabMemberItem = ({ children }: Props) => {
  return (
    <div className={'flex items-center justify-between'}>
      <Text className={'text-[16px] leading-[24px] font-medium'}>{children}</Text>
      <div className={'flex gap-[4px]'}>
        <Tag.Roll variant={'professor'} />
      </div>
    </div>
  )
}
