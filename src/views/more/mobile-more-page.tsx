import { MoreLabWrap, MoreMyWrap, MoreServiceWrap } from '@/widgets/more'

export const MobileMorePage = () => {
  return (
    <div className={'flex flex-1 flex-col gap-4 bg-white px-2 pb-5 focus:outline-none md:px-4'}>
      <MoreMyWrap isMobile />
      <MoreLabWrap isMobile />
      <MoreServiceWrap isMobile />
    </div>
  )
}
