'use client'

import { Image } from 'next/dist/client/image-component'
import { useState } from 'react'
import { AlarmWrapper } from '@/entities/alarm'
import { NoticeTicker } from '@/entities/notice'

export const PcHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <header className={'relative flex items-center'}>
      <div className={'flex shrink-0 cursor-pointer items-center gap-[10px]'}>
        <Image src={'/Mylab_Logo.png'} alt={'로고'} width={40} height={40} />
        <h1 className={'text-foreground text-[28px] leading-none font-extrabold md:text-[32px]'}>
          My<span className={'text-brand'}>Lab</span>
        </h1>
      </div>

      <NoticeTicker className={'mx-2 min-w-0 flex-1'} />

      <div className={'ml-auto shrink-0'}>
        <Image
          className={'cursor-pointer'}
          src={'/icon/icon_main_alarm.svg'}
          alt={'알림'}
          width={35}
          height={35}
          onClick={() => setIsOpen(prev => !prev)}
        />
      </div>
      <AlarmWrapper isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  )
}
