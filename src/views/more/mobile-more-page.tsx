import { MoreLabWrap, MoreMyWrap, MoreServiceWrap } from '@/widgets/more'

export const MobileMorePage = () => {
  return (
    <div className={'flex flex-1 flex-col gap-[20px] bg-white px-[20px] focus:outline-none'}>
      <MoreMyWrap />
      <MoreLabWrap />
      <MoreServiceWrap />
    </div>
  )
}
