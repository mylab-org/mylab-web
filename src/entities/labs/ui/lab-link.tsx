'use client'

import { Image } from 'next/dist/client/image-component'
import { LabLinkItem } from '@/entities/labs'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import type { Dispatch, SetStateAction } from 'react'

interface LabLinkProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const LabLink = ({ setIsOpen }: LabLinkProps) => {
  return (
    <div className={cn('flex flex-col gap-3 rounded-[20px] bg-white p-5', CARD_SHADOW)}>
      <div className={'flex items-center justify-between'}>
        <h3 className={'text-[18px] leading-7 font-bold md:text-[20px]'}>링크</h3>
        <Image
          src={'/icon/icon_main_add.svg'}
          alt={''}
          width={30}
          height={30}
          className={'h-5 w-5 cursor-pointer md:h-6 md:w-6'}
          onClick={() => setIsOpen(true)}
        />
      </div>
      <div className={'flex flex-wrap gap-1.5'}>
        <LabLinkItem href={'#'} name={'연구실 홈페이지'} />
        <LabLinkItem href={'#'} name={'엑셀'} />
        <LabLinkItem href={'#'} name={'이것저것'} />
        <LabLinkItem href={'#'} name={'링크'} />
      </div>
    </div>
  )
}
