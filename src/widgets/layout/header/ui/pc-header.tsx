'use client'

import { Image } from 'next/dist/client/image-component'
import { useState } from 'react'
import { AlarmWrapper } from '@/entities/alarm'

export const PcHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <header className={'relative flex items-center justify-between'}>
      <div className={'flex cursor-pointer items-center gap-[10px]'}>
        <Image src={'/Mylab_Logo.png'} alt={'로고'} width={40} height={40} />
        <h1 className={'text-[28px] leading-none font-extrabold text-gray-900 md:text-[32px]'}>
          My<span className={'text-[#2562CD]'}>Lab</span>
        </h1>
      </div>
      <Image
        className={'cursor-pointer'}
        src={'/icon/icon_main_alarm.svg'}
        alt={'알림'}
        width={35}
        height={35}
        onClick={() => setIsOpen(prev => !prev)}
      />
      <AlarmWrapper isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  )
}
