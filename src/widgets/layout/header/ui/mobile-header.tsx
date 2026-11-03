'use client'

import clsx from 'clsx'
import { usePathname } from 'next/dist/client/components/navigation'
import { Image } from 'next/dist/client/image-component'
import { useState } from 'react'
import { AlarmWrapper } from '@/entities/alarm'

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const pathname = usePathname()

  return (
    <header className={clsx('relative flex items-center justify-between px-[20px] py-[10px]')}>
      <div className={'flex cursor-pointer items-center justify-center gap-[5px]'}>
        <Image src={'/Mylab_Logo.png'} alt={'로고'} width={30} height={30} />
        <h1 className={'text-foreground text-[18px] font-bold'}>MyLab</h1>
      </div>
      <Image
        src={'/icon/icon_main_alarm.svg'}
        alt={'알림'}
        width={24}
        height={24}
        className={'cursor-pointer'}
        onClick={() => setIsOpen(prev => !prev)}
      />
      <AlarmWrapper isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  )
}
