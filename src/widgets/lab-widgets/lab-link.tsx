import { Image } from 'next/dist/client/image-component'
import { useState } from 'react'
import { LabLinkItem } from '@/entities/lab'
import { LabLinkModal } from '@/widgets/modal'

export const LabLink = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className={'flex flex-col gap-[14px] rounded-[24px] bg-white p-[20px] md:p-[24px]'}>
      <div className={'flex items-center justify-between'}>
        <h3 className={'text-[18px] leading-[32px] font-bold md:text-[24px]'}>링크</h3>
        <Image
          src={'/icon/icon_main_add.svg'}
          alt={''}
          width={30}
          height={30}
          className={'h-[20px] w-[20px] cursor-pointer md:h-[30px] md:w-[30px]'}
          onClick={() => setIsOpen(true)}
        />
      </div>
      <div className={'flex flex-wrap gap-[6px]'}>
        <LabLinkItem href={'#'} name={'연구실 홈페이지'} />
        <LabLinkItem href={'#'} name={'엑셀'} />
        <LabLinkItem href={'#'} name={'이것저것'} />
        <LabLinkItem href={'#'} name={'링크'} />
      </div>
      <LabLinkModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}
