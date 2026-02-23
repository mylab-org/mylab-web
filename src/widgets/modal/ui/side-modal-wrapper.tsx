'use client'

import { NoticeListItem } from '@/entities/notice'
import { useLockBodyScroll } from '@/shared/hooks'
import { useSideModalStore } from '@/shared/store/useSideModalStore'
import { SearchInput } from '@/shared/ui'
import { SideModalHeader } from '@/widgets/header'

export const SideModalWrapper = () => {
  const isSideOpen = useSideModalStore(state => state.isSideOpen)
  useLockBodyScroll(isSideOpen)

  return (
    <section className={'fixed inset-0 z-[10] flex h-dvh w-full justify-end bg-black/10'}>
      <div className={'flex w-full flex-col bg-white px-[20px] shadow-lg lg:w-fit lg:rounded-l-[20px]'}>
        <SideModalHeader />
        <div className={'flex w-full flex-1 flex-col gap-[10px] py-[20px] lg:w-[700px]'}>
          <SearchInput />
          <div className={'flex-1'}>
            <NoticeListItem />
            <NoticeListItem />
            <NoticeListItem />
          </div>
        </div>
      </div>
    </section>
  )
}
