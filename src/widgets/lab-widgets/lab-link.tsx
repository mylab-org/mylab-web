import { Image } from 'next/dist/client/image-component'
import { LabLinkBtn } from '@/entities/lab-main'

export const LabLink = () => {
  return (
    <div className={'flex flex-col gap-[14px] rounded-[24px] bg-white p-[24px]'}>
      <div className={'flex items-center justify-between'}>
        <h3 className={'font-pretendard text-[24px] leading-[32px] font-bold'}>링크</h3>
        <Image src={'/icon/icon_main_add.svg'} alt={''} width={30} height={30} className={'cursor-pointer'} />
      </div>
      <div className={'flex flex-wrap gap-[6px]'}>
        <LabLinkBtn href={'#'} name={'연구실 홈페이지'} />
        <LabLinkBtn href={'#'} name={'엑셀'} />
        <LabLinkBtn href={'#'} name={'이것저것'} />
        <LabLinkBtn href={'#'} name={'링크'} />
      </div>
    </div>
  )
}
