'use client'

import { Button } from '@/shared/ui/override/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/override/dialog'
import { InputBox } from '@/shared/ui/template/input-box'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const LabsJoinPrevInfoModal = ({ open, onOpenChange }: Props) => {
  const handleJoinLab = () => {
    console.log('연구실 참여')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="whitespace-pre-wrap">{'참여 전,\n연구실을 다시 확인하세요'}</DialogTitle>
          <DialogDescription className="sr-only">참여할 연구실 정보를 확인합니다.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <InputBox labelName={'학교명'} readOnly={true} />
          <InputBox labelName={'학과명'} readOnly={true} />
          <InputBox labelName={'연구실명'} readOnly={true} />
          <Button onClick={handleJoinLab}>연구실 참여하기</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
