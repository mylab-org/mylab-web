import { Tag, Text } from '@/shared/ui'

export const LabUserInfo = () => {
  return (
    <div className={'flex items-center gap-[10px] rounded-[24px] bg-white p-[24px]'}>
      {/*<Image src={'icon/icon_main_logo.svg'} alt={'프로필'} width={100} height={100} />*/}
      <div className={'bg-gray300 h-[100px] w-[100px] rounded-full'}></div>
      <div className={'flex flex-col gap-[10px] p-[10px]'}>
        <div>
          <Text className={'text-[20px] font-bold whitespace-pre-wrap'}>{`홍길동님,\n좋은 아침이에요!`}</Text>
        </div>
        <div className={'flex gap-[5px]'}>
          <Tag.Roll variant={'leader'} />
          <Tag.Roll variant={'doctoral'} />
        </div>
        <div className={'text-[14px] font-medium'}>
          <Text className={'text-gray-600!'}>BIT Lab · 컴퓨터 통신</Text>
          <Text className={'text-gray-600!'}>wlsdud6221@naver.com</Text>
        </div>
      </div>
    </div>
  )
}
