import { Image } from 'next/dist/client/image-component'
import { SearchInput, Text } from '@/shared/ui'

const SideLabDataItem = () => {
  return (
    <div className={'flex items-start gap-[10px] border-b border-b-gray-200 py-[10px]'}>
      <div className={'flex min-w-0 flex-1 flex-col gap-[5px]'}>
        <Text className={'truncate text-[14px] font-bold lg:text-[18px]'}>
          시맨틱 통신 기반 mmWave/THz 대역 통신/네트워크 기술 최적화 연구
        </Text>
        <div className={'flex min-w-0 items-center gap-[6px]'}>
          <Image src={'/icon/link.svg'} alt={''} width={16} height={16} />
          <Text className={'min-w-0 truncate text-[12px] font-normal text-gray-500! lg:text-[14px]'}>
            시맨틱 통신 기반 mmWave/THz 대역 통신/네트워크 기술 최적화 연구
          </Text>
        </div>
        <div className={'flex min-w-0 items-center gap-[6px]'}>
          <Image src={'/icon/icon_main_download.svg'} alt={''} width={16} height={16} />
          <Text className={'min-w-0 truncate text-[12px] font-normal text-gray-500! lg:text-[14px]'}>
            시맨틱 통신 기반 mmWave/THz 대역 통신/네트워크 기술 최적화 연구
          </Text>
        </div>
        <div className={'flex items-center justify-between text-[10px] lg:text-[14px]'}>
          <Text className={'text-[#1a1a1a]!'}>2025.12.04(수) 12:31</Text>
          <div className={'flex items-center gap-[5px]'}>
            <Image
              src={'/icon_example.png'}
              alt={''}
              width={20}
              height={20}
              className={'bg-gray300 h-[16px] w-[16px] rounded-full lg:h-[20px] lg:w-[20px]'}
            />
            <Text className={'text-[#1a1a1a]!'}>김교수</Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export const SideLabDataList = ({ isBottom }: { isBottom: boolean }) => {
  return (
    <div className={'border-t-gray300 flex min-h-0 flex-1 flex-col gap-[10px] border-t pt-[10px]'}>
      <SearchInput />
      <div className={`flex flex-1 flex-col gap-[15px] ${isBottom ? 'overflow-hidden' : 'overflow-auto'}`}>
        <SideLabDataItem />
        <SideLabDataItem />
        <SideLabDataItem />
        <SideLabDataItem />
        <SideLabDataItem />
        <SideLabDataItem />
        <SideLabDataItem />
      </div>
    </div>
  )
}
