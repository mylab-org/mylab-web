import { MoreLabWrap, MoreMyWrap, MoreServiceWrap } from '@/widgets/more'

export const MorePage = () => {
  return (
    <div className={'flex flex-1 gap-[30px] focus:outline-none'}>
      <MoreMyWrap width={'w-[500px]'} />
      <MoreLabWrap width={'w-[500px]'} />
      <MoreServiceWrap width={'w-[500px]'} />
    </div>
  )
}
