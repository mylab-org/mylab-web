import { Image } from 'next/dist/client/image-component'
import { P } from '@/shared/ui'

export const LabDownloadData = () => {
  return (
    <div className={'bg-gray100 flex cursor-pointer items-center justify-between rounded-[8px] px-[12px] py-[8px]'}>
      <div className={'flex gap-[6px]'}>
        <Image src={'/icon/link.svg'} alt={''} width={16} height={16} />
        <P className={'text-[14px] font-normal'}>2025 논문 발표 자료 GoogleDrive</P>
      </div>
      <P className={'text-[14px] font-normal text-[#6b6b6b]!'}>김교수</P>
    </div>
  )
}
