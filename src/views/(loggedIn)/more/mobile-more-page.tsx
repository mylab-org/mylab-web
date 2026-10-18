import { MoreLabSection, MoreMySection, MoreServiceSection } from '@/widgets/more'

export const MobileMorePage = () => {
  return (
    <div className={'flex flex-1 flex-col gap-4 bg-white px-2 pb-5 focus:outline-none md:px-4'}>
      <MoreMySection isMobile />
      <MoreLabSection isMobile />
      <MoreServiceSection isMobile />
    </div>
  )
}
