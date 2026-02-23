'use client'

import { Image } from 'next/dist/client/image-component'
import { useEffect } from 'react'
import { useSideModalStore } from '@/shared/store/useSideModalStore'

export const SideModalHeader = () => {
  const setIsSideOpen = useSideModalStore(state => state.setIsSideOpen)

  useEffect(() => {
    return () => setIsSideOpen(false)
  }, [])

  return (
    <div className={'flex items-center justify-between py-[20px]'}>
      <h3 className={'font-pretendard text-[24px] leading-[32px] font-bold'}>공지사항</h3>
      <Image
        src={'icon/x.svg'}
        alt={''}
        width={36}
        height={36}
        className={'block shrink-0'}
        onClick={() => setIsSideOpen(false)}
      />
    </div>
  )
}
