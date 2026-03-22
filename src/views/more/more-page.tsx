'use client'

import { MoreLabWrap, MoreMyWrap, MoreServiceWrap } from '@/widgets/more'

export const MorePage = () => {
  return (
    <div className={'flex flex-1 gap-7.5 focus:outline-none'}>
      <MoreMyWrap isMaxWidth />
      <MoreLabWrap isMaxWidth />
      <MoreServiceWrap isMaxWidth />
    </div>
  )
}
