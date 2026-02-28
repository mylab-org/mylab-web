'use client'

import { Image } from 'next/dist/client/image-component'
import { useState } from 'react'
import { useSideModalStore } from '@/shared/store/useSideModalStore'
import { AlarmWrapper } from '@/widgets/alram'
import { SideWrap } from '@/widgets/modal'

export const PcHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const isSideModal = useSideModalStore(state => state.isSideOpen)

  return (
    <>
      <header className={'relative flex items-center justify-between'}>
        <div className={'flex gap-[10px]'}>
          <Image
            className={'cursor-pointer'}
            src={'/icon/icon_main_logo.svg'}
            alt={'로고'}
            width={40}
            height={40}
            onClick={() => setIsOpen(prev => !prev)}
          />
          <h1 className={'font-pretendard text-gray900 text-[36px] leading-none font-bold'}>나의 연구 생활, MyLab</h1>
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
      <SideWrap />
    </>
  )
}
