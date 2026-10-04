'use client'

import { Image } from 'next/dist/client/image-component'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { useDialogStore } from '@/shared/store/useDialogStore'
import { Button } from '@/shared/ui/override/button'
import { Text } from '@/shared/ui/override/text'
import { DialogClose, DialogOverlay, DialogPortal, Dialog as DialogRoot } from '@/shared/ui/shadcn/dialog'

export const Dialog = () => {
  const btnText = useDialogStore(state => state.btnText)
  const item = useDialogStore(state => state.item)
  const isOpen = useDialogStore(state => state.isOpen)
  const closeDialogModal = useDialogStore(state => state.closeDialogModal)
  const callback = useDialogStore(state => state.callback)

  const handleOpenChange = (open: boolean) => {
    if (!open) closeDialogModal()
  }

  return (
    <DialogRoot open={isOpen} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay className={'supports-backdrop-filter:backdrop-blur-none'} />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={
            'fixed top-1/2 left-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col rounded-[20px] bg-white shadow-lg outline-none'
          }
        >
          <div className={'flex w-[300px] flex-col p-5 md:w-[600px]'}>
            <div className={'flex flex-1 items-center justify-between'}>
              <DialogPrimitive.Title asChild>
                <h3 className={'text-[16px] font-bold lg:text-[20px]'}>{item.title}</h3>
              </DialogPrimitive.Title>
              <DialogClose className={'block shrink-0 cursor-pointer'}>
                <Image src={'icon/x.svg'} alt={''} width={30} height={30} className={'block'} />
              </DialogClose>
            </div>
            <div className={'flex flex-col gap-2.5 py-5'}>
              <Text className={'text-[12px] font-medium whitespace-pre-wrap text-gray-600! md:text-[14px]'}>
                {item.description}
              </Text>
              {item.etc && (
                <Text className={'text-[12px] font-bold whitespace-pre-wrap text-gray-600! md:text-[14px]'}>
                  {item.etc}
                </Text>
              )}
            </div>
            <Button onClick={callback}>{btnText}</Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </DialogRoot>
  )
}
