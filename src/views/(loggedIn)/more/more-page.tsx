'use client'

import { MoreLabSection, MoreMySection, MoreServiceSection } from '@/widgets/more'

export const MorePage = () => {
  return (
    <div className={'flex flex-1 gap-7.5 focus:outline-none'}>
      <MoreMySection isMaxWidth />
      <MoreLabSection isMaxWidth />
      <MoreServiceSection isMaxWidth />
    </div>
  )
}
