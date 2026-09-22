'use client'

import { LabsCreateForm, LabsJoinForm } from '@/features/labs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/override/dialog'

type Props = {
  open: boolean
  onClose: () => void
  type: 'create' | 'join'
}

export const LoginLabCreateJoinModal = ({ open, onClose, type }: Props) => {
  return (
    <Dialog
      open={open}
      onOpenChange={open => {
        if (!open) {
          onClose()
        }
      }}
    >
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>{type === 'create' ? '연구실 생성' : '연구실 참여'}</DialogTitle>
          <DialogDescription className="sr-only">연구실을 생성하거나 참여합니다.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {type === 'create' ? <LabsCreateForm hideTitle /> : <LabsJoinForm hideTitle />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
