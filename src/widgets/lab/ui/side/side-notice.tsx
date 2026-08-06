import { NoticeListItem } from '@/entities/notice'
import { Input } from '@/shared/ui/override/input'

export const SideNotice = () => {
  return (
    <div className={'flex h-full min-h-0 w-full flex-col gap-2.5 px-5 pb-5 lg:w-[750px] lg:px-7.5'}>
      <div className={'rounded-[12px] border border-gray-200 px-5'}>
        <Input className={'border-none'} placeholder={'제목으로 검색해보세요'} />
      </div>
      <div className={'flex flex-1 flex-col gap-2.5 overflow-auto'}>
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
