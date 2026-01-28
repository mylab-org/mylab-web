import { Image } from 'next/dist/client/image-component'
import { P } from '@/shared/ui'

interface AlarmItemProps {
  type: string
  dateAt: string
  title: string
}

export const AlarmListItem = ({ dateAt, type, title }: AlarmItemProps) => {
  return (
    <li className={'flex items-center gap-[20px] py-[10px]'}>
      <Image src={'/icon_example.png'} alt={''} width={20} height={20} className={'shrink-0'} />
      <div className={'flex-1'}>
        <div className={'flex items-center justify-between'}>
          <P className={'text-[12px] leading-[22px] font-normal text-[#9CA3AF]!'}>{type}</P>
          <P className={'text-[12px] leading-[22px] font-normal text-[#9CA3AF]!'}>{dateAt}</P>
        </div>
        <P className={'text-[16px] leading-[20px] font-normal'}>{title}</P>
      </div>
    </li>
  )
}
