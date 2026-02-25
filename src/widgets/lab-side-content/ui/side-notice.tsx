import { NoticeListItem } from '@/entities/notice'
import { SearchInput } from '@/shared/ui'

export const SideNotice = () => {
  return (
    <div className={'flex w-full flex-1 flex-col gap-[10px] px-[30px] py-[20px] lg:w-[750px]'}>
      <SearchInput />
      <div className={'flex-1'}>
        <NoticeListItem />
        <NoticeListItem />
        <NoticeListItem />
      </div>
    </div>
  )
}
