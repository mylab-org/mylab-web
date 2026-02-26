'use client'

import { Image } from 'next/dist/client/image-component'
import { useEffect } from 'react'
import { useSideModalStore } from '@/shared/store/useSideModalStore'

export const SideModalHeader = () => {
  const closeSideModal = useSideModalStore(state => state.closeSideModal)
  const Title = useSideModalStore(state => state.sideTitle)

  useEffect(() => {
    return () => closeSideModal()
  }, [])

  return (
    <div className={'flex items-center justify-between px-[30px] py-[20px]'}>
      <h3 className={'font-pretendard text-[18px] leading-[32px] font-bold lg:text-[24px]'}>{Title}</h3>
      <Image
        src={'icon/x.svg'}
        alt={''}
        width={36}
        height={36}
        className={'block shrink-0 cursor-pointer'}
        onClick={closeSideModal}
      />
    </div>
  )
}
