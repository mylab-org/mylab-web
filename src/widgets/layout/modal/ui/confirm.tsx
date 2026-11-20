'use client'

import { Dialog as DialogPrimitive } from 'radix-ui'
import { useEffect } from 'react'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
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
          className={cn(
            'bg-card text-foreground fixed top-1/2 left-1/2 z-50 w-[min(100%-2rem,360px)] -translate-x-1/2 -translate-y-1/2 rounded-[20px] outline-none',
            CARD_SHADOW,
          )}
        >
          <div className={'flex flex-col gap-5 p-5 md:p-6'}>
            <div className={'flex flex-col gap-2'}>
              <DialogPrimitive.Title asChild>
                <h3 className={'text-foreground text-[16px] font-bold md:text-[18px]'}>확인</h3>
              </DialogPrimitive.Title>
              <DialogPrimitive.Description asChild>
                <Text className={'text-muted-foreground! text-[13px] font-medium whitespace-pre-wrap md:text-[14px]'}>
                  {msg}
                </Text>
              </DialogPrimitive.Description>
            </div>

            <div className={'flex gap-2.5'}>
              <Button className={'w-full'} onClick={onTrue}>
                확인
              </Button>
              <Button
                color={'none'}
                className={'border-border text-foreground! bg-card! hover:bg-muted! w-full border'}
                onClick={onFalse}
              >
                취소
              </Button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
