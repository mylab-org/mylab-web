'use client'

import { MoreLabWrap, MoreMyWrap, MoreServiceWrap } from '@/widgets/more'
import { MoreUserUpdate, MoreServiceUse, MoreLabUpdate, MoreLabMember, MoreUserPw } from '@/widgets/more-side-content'

export const MorePage = () => {
  return (
    <div className={'flex flex-1 gap-[30px] focus:outline-none'}>
      <MoreMyWrap isMaxWidth UserUpdate={MoreUserUpdate} />
      <MoreLabWrap isMaxWidth />
      <MoreServiceWrap isMaxWidth />
    </div>
  )
}
