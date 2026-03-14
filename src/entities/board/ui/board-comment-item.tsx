import { Image } from 'next/dist/client/image-component'
import { Text } from '@/shared/ui/text'

export const BoardCommentItem = () => {
  return (
    <div className={'flex flex-col gap-[4px] py-[5px]'}>
      <div className={'flex items-center gap-[5px]'}>
        <Text className={'text-[12px] font-bold text-slate-600 lg:text-[14px]'}>김땡땡</Text>
        <Text className={'text-[10px] font-medium text-slate-400 lg:text-[12px]'}>BIT Lab · 컴퓨터 통신</Text>
      </div>
      <div className={'flex flex-col gap-[10px]'}>
        <Text className={'text-[12px] font-normal lg:text-[14px]'}>ㅇㅈ 빨강도 맛잇음!</Text>
        <div className={'flex items-center gap-[5px]'}>
          <Image src={'/icon/icon_board_time.svg'} alt={''} width={12} height={12} />
          <Text className={'text-[10px] font-medium text-slate-400 lg:text-[12px]'}>어제 19:00</Text>
        </div>
      </div>
    </div>
  )
}
