import { SearchInput } from '@/shared/ui'

export const SideManagement = () => {
  return (
    <div className={'flex w-full flex-1 flex-col gap-[10px] py-[20px] lg:w-[700px]'}>
      <SearchInput />
      <div className={'flex-1'}>비품관리</div>
    </div>
  )
}
