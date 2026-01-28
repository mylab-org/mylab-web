'use client'

import { Image } from 'next/dist/client/image-component'
import { useState } from 'react'
import { AlarmWrapper } from '@/widgets/alram'

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <header className={'relative flex items-center justify-between px-[20px] py-[10px]'}>
      <h1 className={'font-pretendard text-gray900 text-[20px] font-semibold'}>MyLab</h1>
      <Image
        src={'/icon/bell.svg'}
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
