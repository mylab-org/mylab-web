'use client'

import { useRouter } from 'next/navigation'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { useEffect } from 'react'
import { ALERT_CONFIRM_TYPE } from '@/shared/constant/alert'
import { ROUTES } from '@/shared/constant/routes'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { useAlertStore } from '@/shared/store'
import { Button } from '@/shared/ui/override/button'
import { Text } from '@/shared/ui/override/text'
import { Dialog, DialogOverlay, DialogPortal } from '@/shared/ui/shadcn/dialog'

export const Alert = () => {
  const router = useRouter()
  const isOpen = useAlertStore(state => state.isAlert)
  const msg = useAlertStore(state => state.msg)
  const confirmType = useAlertStore(state => state.confirmType)
  const onCloseAlert = useAlertStore(state => state.onCloseAlert)

  useEffect(() => {
    return () => {
      onCloseAlert()
    }
  }, [onCloseAlert])

  const handleConfirm = () => {
    onCloseAlert()

    if (confirmType === ALERT_CONFIRM_TYPE.NAVIGATE_LOGIN) {
      router.push(ROUTES.AUTH.LOGIN.LINK)
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) handleConfirm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay className={'supports-backdrop-filter:backdrop-blur-none'} />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            'bg-card text-foreground fixed top-1/2 left-1/2 z-50 w-[min(100%-2rem,360px)] -translate-x-1/2 -translate-y-1/2 rounded-[20px] outline-none',
            CARD_SHADOW,
          )}
        >
          <div className={'flex flex-col gap-5 p-5 md:p-6'}>
            <div className={'flex flex-col gap-2'}>
              <DialogPrimitive.Title asChild>
                <h3 className={'text-foreground text-[16px] font-bold md:text-[18px]'}>알림</h3>
              </DialogPrimitive.Title>
              <DialogPrimitive.Description asChild>
                <Text className={'text-muted-foreground! text-[13px] font-medium whitespace-pre-wrap md:text-[14px]'}>
                  {msg}
                </Text>
              </DialogPrimitive.Description>
            </div>

            <Button className={'w-full'} onClick={handleConfirm}>
              확인
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
