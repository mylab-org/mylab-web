import { Text } from '@/shared/ui'
import { Tag } from '@/shared/ui/tag'

export const LabUserInfo = () => {
  return (
    <div className={'flex items-center gap-[10px] rounded-[24px] bg-white p-[20px] md:p-[24px]'}>
      {/*<Image src={'icon/icon_main_logo.svg'} alt={'프로필'} width={100} height={100} />*/}
      <div className={'bg-gray300 h-[70px] w-[70px] rounded-full md:h-[100px] md:w-[100px]'}></div>
      <div className={'flex flex-col gap-[10px] p-[10px]'}>
        <div>
          <Text
            className={'text-[16px] font-bold whitespace-pre-wrap md:text-[20px]'}
          >{`홍길동님,\n좋은 아침이에요!`}</Text>
        </div>
        <div className={'flex gap-[5px]'}>
          <Tag.Roll variant={'leader'} />
          <Tag.Roll variant={'doctoral'} />
        </div>
        <div className={'text-[10px] font-medium md:text-[14px]'}>
          <Text className={'text-gray-600!'}>BIT Lab · 컴퓨터 통신</Text>
          <Text className={'text-gray-600!'}>wlsdud6221@naver.com</Text>
        </div>
      </div>
    </div>
  )
}
