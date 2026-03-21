import { MoreLabWrap, MoreMyWrap, MoreServiceWrap } from '@/widgets/more'
import { MoreUserUpdate, MoreServiceUse, MoreLabUpdate, MoreLabMember, MoreUserPw } from '@/widgets/more-side-content'

export const MobileMorePage = () => {
  return (
    <div className={'flex flex-1 flex-col gap-[20px] bg-white px-[20px] focus:outline-none'}>
      <MoreMyWrap UserUpdate={MoreUserUpdate} />
      <MoreLabWrap />
      <MoreServiceWrap />
    </div>
  )
}
