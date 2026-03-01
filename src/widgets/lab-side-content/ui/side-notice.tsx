import { NoticeListItem } from '@/entities/notice'
import { SearchInput } from '@/shared/ui'

export const SideNotice = () => {
  return (
    <div className={'flex h-full min-h-0 w-full flex-col gap-[10px] px-[20px] pb-5 lg:w-[750px] lg:px-[30px]'}>
      <SearchInput />
      <div className={'flex flex-1 flex-col gap-[10px] overflow-auto'}>
        <NoticeListItem />
        <NoticeListItem />
        <NoticeListItem />
        <NoticeListItem />
        <NoticeListItem />
        <NoticeListItem />
        <NoticeListItem />
        <NoticeListItem />
        <NoticeListItem />
        <NoticeListItem />
        <NoticeListItem />
        <NoticeListItem />
      </div>
    </div>
  )
}
