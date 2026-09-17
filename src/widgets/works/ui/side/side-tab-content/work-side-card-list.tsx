import { MemberProgressItem } from '@/entities/works'

export const WorkSideCardList = () => {
  return (
    <div className={'flex min-h-0 flex-1 flex-col gap-7.5 overflow-y-auto border-t border-t-gray-300 py-5'}>
      <MemberProgressItem />
      <MemberProgressItem />
      <MemberProgressItem />
    </div>
  )
}
