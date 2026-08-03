import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'

interface UserInfoProps {
  isMain?: boolean
  isShadow?: boolean
}

export const UserInfo = ({ isMain = false, isShadow = false }: UserInfoProps) => {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-[24px] bg-white p-5 md:p-6 ${isShadow && 'shadow-[0px_1px_3px_rgba(0,0,0,0.03),0px_4px_16px_rgba(0,0,0,0.04)]'}`}
    >
      {/*<Image src={'icon/icon_main_logo.svg'} alt={'프로필'} width={100} height={100} />*/}
      <div className={'h-[70px] w-[70px] rounded-full bg-gray-300 md:h-[100px] md:w-[100px]'}></div>
      <div className={`flex flex-col gap-2.5 p-2.5`}>
        <div className={`flex gap-2.5 ${isMain ? 'flex-col' : 'flex-row'}`}>
          <div>
            <Text className={'text-[16px] font-bold md:text-[20px]'}>{`홍길동님`}</Text>
            {isMain && <Text className={'text-[16px] font-bold md:text-[20px]'}>{`좋은 아침이에요!`}</Text>}
          </div>
          <div className={'flex gap-1.25'}>
            <Tag.Roll variant={'leader'} />
            <Tag.Roll variant={'doctoral'} />
          </div>
        </div>
        <div className={'text-[10px] font-medium md:text-[14px]'}>
          <Text className={'text-gray-600!'}>BIT Lab · 컴퓨터 통신</Text>
          <Text className={'text-gray-600!'}>wlsdud6221@naver.com</Text>
        </div>
      </div>
    </div>
  )
}
