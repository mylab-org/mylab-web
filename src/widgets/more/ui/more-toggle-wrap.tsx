import { Text } from '@/shared/ui/text'
import { ToggleSwitch } from '@/shared/ui/toggle-switch'

interface MoreToggleWrapProps {
  title: string
  description?: string
}

export const MoreToggleWrap = ({ description, title }: MoreToggleWrapProps) => {
  return (
    <div className={'flex flex-col gap-[5px]'}>
      <div className={'flex items-center justify-between'}>
        <Text className={'text-[12px] font-bold md:text-[16px]'}>{title}</Text>
        <ToggleSwitch isSwitch={true} onSwitch={() => {}} />
      </div>
      {description && <Text className={'text-[10px] font-medium text-gray-600! md:text-[14px]'}>{description}</Text>}
    </div>
  )
}
