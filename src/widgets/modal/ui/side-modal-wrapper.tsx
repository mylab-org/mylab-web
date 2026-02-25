'use client'

import { useLockBodyScroll } from '@/shared/hooks'
import { useSideModalStore } from '@/shared/store/useSideModalStore'
import { SideModalHeader } from '@/widgets/header'

export const SideModalWrapper = () => {
  const isSideOpen = useSideModalStore(state => state.isSideOpen)
  const closeSideModal = useSideModalStore(state => state.closeSideModal)
  const Content = useSideModalStore(state => state.selectedContent)
  useLockBodyScroll(isSideOpen)

  const handleCloseSideModal = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) closeSideModal()
  }

  return (
    <section className={'fixed inset-0 z-10 flex h-dvh w-full justify-end bg-black/10'} onClick={handleCloseSideModal}>
      <div className={'relative flex w-full flex-col bg-white shadow-lg lg:w-fit lg:rounded-l-[20px]'}>
        <SideModalHeader />
        {Content && <Content />}
      </div>
    </section>
  )
}
