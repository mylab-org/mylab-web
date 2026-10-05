'use client'

import { useRouter } from 'next/navigation'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { useEffect } from 'react'
import { ALERT_CONFIRM_TYPE } from '@/shared/constant/alert'
import { ROUTES } from '@/shared/constant/routes'
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
          className={
            'fixed top-1/2 left-1/2 z-50 flex min-w-[250px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[20px] bg-white outline-none'
          }
        >
          <div className="flex w-full flex-1 items-center justify-center p-7.5">
            <DialogPrimitive.Title asChild>
              <Text className="text-center font-semibold whitespace-pre-line text-black">{msg}</Text>
            </DialogPrimitive.Title>
          </div>
          <Button className="w-full rounded-none rounded-b-[20px]" onClick={handleConfirm}>
            확인
          </Button>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
