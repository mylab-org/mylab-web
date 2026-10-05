'use client'

import { Image } from 'next/dist/client/image-component'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { useEffect } from 'react'
import { useSideModalStore } from '@/shared/store'
import { Dialog, DialogClose, DialogOverlay, DialogPortal, DialogTitle } from '@/shared/ui/shadcn/dialog'

export const SideWrapper = () => {
  const isSideOpen = useSideModalStore(state => state.isSideOpen)
  const closeSideModal = useSideModalStore(state => state.closeSideModal)
  const Content = useSideModalStore(state => state.selectedContent)
  const Title = useSideModalStore(state => state.sideTitle)

  useEffect(() => {
    return () => closeSideModal()
  }, [])

  const handleOpenChange = (open: boolean) => {
    if (!open) closeSideModal()
  }

  return (
    <Dialog open={isSideOpen} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay
          className={
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 duration-200 supports-backdrop-filter:backdrop-blur-none'
          }
        />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={
            'fixed top-0 right-0 z-50 flex h-dvh w-full flex-col bg-white shadow-lg outline-none lg:w-fit lg:rounded-l-[20px] ' +
            'data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:animate-in data-[state=open]:slide-in-from-right duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]'
          }
        >
          <div className={'flex items-center justify-between px-5 py-5 lg:px-7.5'}>
            <DialogTitle asChild>
              <h3 className={'font-pretendard text-[18px] leading-8 font-bold! lg:text-[24px]'}>{Title}</h3>
            </DialogTitle>
            <DialogClose className={'block shrink-0 cursor-pointer'}>
              <Image src={'icon/x.svg'} alt={''} width={36} height={36} className={'block'} />
            </DialogClose>
          </div>
          {Content && <Content />}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
