import { MemberProgressItem } from '@/entities/work-side'

export const WorkSideCardList = () => {
  return (
    <div className={'flex min-h-0 flex-1 flex-col gap-[30px] overflow-y-auto border-t border-t-gray-300 py-[20px]'}>
      <MemberProgressItem />
      <MemberProgressItem />
      <MemberProgressItem />
    </div>
  )
}
