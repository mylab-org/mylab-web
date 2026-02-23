import { SearchInput } from '@/shared/ui'

export const SideWeek = () => {
  return (
    <div className={'flex w-full flex-1 flex-col gap-[10px] py-[20px] lg:w-[700px]'}>
      <SearchInput />
      <div className={'flex-1'}>연구실 주간일정</div>
    </div>
  )
}
