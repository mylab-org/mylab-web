'use client'

import { Image } from 'next/dist/client/image-component'
import { useState } from 'react'
import { AlarmWrapper } from '@/widgets/alram'

export const PcHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <header className={'relative flex items-center justify-between'}>
      <h1 className={'font-pretendard text-gray900 text-[36px] leading-none font-bold'}>마이랩 연구실</h1>
      <Image
        className={'cursor-pointer'}
        src={'/icon/bell.svg'}
        alt={'알림'}
        width={24}
        height={24}
        onClick={() => setIsOpen(prev => !prev)}
      />
      <AlarmWrapper isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  )
}
