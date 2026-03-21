import { Image } from 'next/dist/client/image-component'
import { Text } from '@/shared/ui/text'

export const LabDataItem = () => {
  return (
    <div className={'flex items-start gap-2.5 border-b border-b-gray-200 py-2.5'}>
      <div className={'flex min-w-0 flex-1 flex-col gap-1.25'}>
        <Text className={'truncate text-[14px] font-bold lg:text-[18px]'}>
          시맨틱 통신 기반 mmWave/THz 대역 통신/네트워크 기술 최적화 연구
        </Text>
        <div className={'flex min-w-0 items-center gap-1.5'}>
          <Image src={'/icon/link.svg'} alt={''} width={16} height={16} />
          <Text className={'min-w-0 truncate text-[12px] font-normal text-gray-500 lg:text-[14px]'}>
            시맨틱 통신 기반 mmWave/THz 대역 통신/네트워크 기술 최적화 연구
          </Text>
        </div>
        <div className={'flex min-w-0 items-center gap-1.5'}>
          <Image src={'/icon/icon_main_download.svg'} alt={''} width={16} height={16} />
          <Text className={'min-w-0 truncate text-[12px] font-normal text-gray-500 lg:text-[14px]'}>
            시맨틱 통신 기반 mmWave/THz 대역 통신/네트워크 기술 최적화 연구
          </Text>
        </div>
        <div className={'flex items-center justify-between text-[10px] lg:text-[14px]'}>
          <Text className={'text-[#1a1a1a]'}>2025.12.04(수) 12:31</Text>
          <div className={'flex items-center gap-1.25'}>
            <Image
              src={'/icon_example.png'}
              alt={''}
              width={20}
              height={20}
              className={'h-[16px] w-[16px] rounded-full bg-gray-300 lg:h-[20px] lg:w-[20px]'}
            />
            <Text className={'text-[#1a1a1a]'}>김교수</Text>
          </div>
        </div>
      </div>
    </div>
  )
}
