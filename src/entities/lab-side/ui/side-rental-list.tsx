import { Image } from 'next/dist/client/image-component'
import { Text } from '@/shared/ui'

const SideRentalItem = () => {
  return (
    <div className={'flex gap-[10px] p-[10px]'}>
      <div className={'h-[50px] w-[50px] rounded-[10px] bg-gray-200 p-[10px] lg:h-[100px] lg:w-[100px]'} />
      <div className={'flex flex-1 flex-col justify-between gap-[10px] lg:px-[10px] lg:py-[5px]'}>
        <div className={'flex flex-1 flex-col gap-[10px]'}>
          <Text className={'text-[14px] font-bold lg:text-[24px]'}>공용 모니터</Text>
          <div className={'flex items-center gap-[5px]'}>
            <Image
              src={'/icon_example.png'}
              alt={''}
              width={20}
              height={20}
              className={'h-[16px] w-[16px] rounded-full lg:h-[20px] lg:w-[20px]'}
            />
            <Text className={'text-[10px] font-semibold text-gray-500! lg:text-[14px]'}>
              김철수 대여 | 26.01.05 15:00 ~ 26.01.10 13:00
            </Text>
          </div>
        </div>

        <div className={'flex flex-col gap-[4px]'}>
          <div className={'bg-gray400 relative flex h-[10px] overflow-hidden rounded-[24px]'}>
            <div className={'bg-blue500 absolute flex h-[10px] w-1/2 rounded-[24px]'}></div>
            <div className={'bg-gray700 absolute left-[80%] flex h-[10px] w-1/3 rounded-[24px]'}></div>
          </div>
          <div className={'flex items-center justify-between'}>
            <Text className={'text-gray400! text-[8px] font-semibold lg:text-[14px]'}>01/05</Text>
            <Text className={'text-gray400! text-[8px] font-semibold lg:text-[14px]'}>12:00</Text>
            <Text className={'text-gray400! text-[8px] font-semibold lg:text-[14px]'}>01/06</Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export const SideRentalList = () => {
  return (
    <div className={'flex flex-1 flex-col gap-[15px]'}>
      <div
        className={'border-gray300 flex items-center gap-[20px] rounded-[12px] border px-[20px] py-[10px] lg:py-[15px]'}
      >
        <Image
          src={'icon/icon_main_time.svg'}
          alt={''}
          width={24}
          height={24}
          className={'h-[16px] w-[16px] lg:h-[24px] lg:w-[24px]'}
        />
        <div className={'flex flex-1 flex-col gap-[4px]'}>
          <Text className={'text-[14px] font-semibold lg:text-[24px]'}>오늘 01:50 ~ 09:00</Text>
          <Text className={'text-gray400! text-[10px] font-medium lg:text-[16px]'}>총 18시간 이용</Text>
        </div>
      </div>
      <div className={'flex flex-1 flex-col gap-[15px]'}>
        <SideRentalItem />
        <SideRentalItem />
        <SideRentalItem />
      </div>
    </div>
  )
}
