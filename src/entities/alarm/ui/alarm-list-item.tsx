import { Image } from 'next/dist/client/image-component'
import { Text } from '@/shared/ui/override/text'

interface AlarmItemProps {
  type: string
  dateAt: string
  title: string
}

export const AlarmListItem = ({ dateAt, type, title }: AlarmItemProps) => {
  return (
    <li className={'flex items-center gap-5 py-2.5'}>
      <Image src={'/icon_example.png'} alt={''} width={20} height={20} className={'shrink-0'} />
      <div className={'flex-1'}>
        <div className={'flex items-center justify-between'}>
          <Text className={'text-[10px] leading-5.5 font-normal text-[#9CA3AF]! lg:text-[12px]'}>{type}</Text>
          <Text className={'text-[10px] leading-5.5 font-normal text-[#9CA3AF]! lg:text-[12px]'}>{dateAt}</Text>
        </div>
        <Text className={'text-[12px] leading-5 font-normal lg:text-[16px]'}>{title}</Text>
      </div>
    </li>
  )
}
