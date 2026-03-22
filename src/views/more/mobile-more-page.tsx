import { MoreLabWrap, MoreMyWrap, MoreServiceWrap } from '@/widgets/more'

export const MobileMorePage = () => {
  return (
    <div className={'flex flex-1 flex-col gap-4 bg-white px-4 focus:outline-none'}>
      <MoreMyWrap />
      <MoreLabWrap />
      <MoreServiceWrap />
    </div>
  )
}
