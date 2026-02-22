import { Image } from 'next/dist/client/image-component'
import { Text } from '@/shared/ui'

export const LabDownloadData = () => {
  return (
    <button className={'bg-gray100 flex cursor-pointer items-center justify-between rounded-[8px] px-[12px] py-[8px]'}>
      <div className={'flex flex-1 gap-[6px] overflow-auto'}>
        <Image src={'/icon/link.svg'} alt={''} width={16} height={16} />
        <Text className={'flex-1 truncate text-left text-[14px] font-normal'}>2025 논문 발표 자료 GoogleDrive</Text>
      </div>
      <Text className={'shrink-0 text-[14px] font-normal text-[#6b6b6b]!'}>김교수</Text>
    </button>
  )
}
