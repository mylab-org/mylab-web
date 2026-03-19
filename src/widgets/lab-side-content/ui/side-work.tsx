import { WorkListItem } from '@/entities/works'

export const SideWork = () => {
  return (
    <div className={'flex h-full min-h-0 w-full flex-col gap-[15px] px-5 pb-5 lg:w-[750px] lg:px-[30px]'}>
      <div className={'flex flex-1 flex-col gap-[15px] overflow-auto'}>
        <WorkListItem className={'rounded-[12px] border border-[#e2e3e5] p-4 md:w-full'} />
        <WorkListItem className={'rounded-[12px] border border-[#e2e3e5] p-4 md:w-full'} />
        <WorkListItem className={'rounded-[12px] border border-[#e2e3e5] p-4 md:w-full'} />
        <WorkListItem className={'rounded-[12px] border border-[#e2e3e5] p-4 md:w-full'} />
      </div>
    </div>
  )
}
