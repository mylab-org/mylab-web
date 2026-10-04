'use client'

import { Dialog as DialogPrimitive } from 'radix-ui'
import { useEffect } from 'react'
import { useConfirmStore } from '@/shared/store'
import { Button } from '@/shared/ui/override/button'
import { Text } from '@/shared/ui/override/text'
import { Dialog, DialogOverlay, DialogPortal } from '@/shared/ui/shadcn/dialog'

export const Confirm = () => {
  const isOpen = useConfirmStore(state => state.isConfirm)
  const msg = useConfirmStore(state => state.msg)
  const onTrue = useConfirmStore(state => state.onTrue)
  const onFalse = useConfirmStore(state => state.onFalse)

  useEffect(() => {
    return () => {
      onFalse()
    }
  }, [])

  const handleOpenChange = (open: boolean) => {
    if (!open) onFalse()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay className={'supports-backdrop-filter:backdrop-blur-none'} />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          onInteractOutside={e => e.preventDefault()}
          className={
            'fixed top-1/2 left-1/2 z-50 flex min-w-[250px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[20px] bg-white outline-none'
          }
        >
          <div className="flex w-full flex-1 items-center justify-center p-12.5">
            <DialogPrimitive.Title asChild>
              <Text className="font-semibold text-black">{msg}</Text>
            </DialogPrimitive.Title>
          </div>
          <div className="flex w-full">
            <Button className="w-full rounded-none rounded-bl-[20px]" onClick={onTrue}>
              확 인
            </Button>
            <Button className="w-full rounded-none rounded-br-[20px]" color="error" onClick={onFalse}>
              닫 기
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
