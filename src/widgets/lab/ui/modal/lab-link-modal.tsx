'use client'

import { Button } from '@/shared/ui/override/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/override/dialog'
import { Text } from '@/shared/ui/override/text'
import { InputBox } from '@/shared/ui/template/input-box'

interface LabLinkModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const LabLinkModal = ({ open, onOpenChange }: LabLinkModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className={'sm:max-w-[600px]'}>
        <DialogHeader>
          <DialogTitle>연구활동 링크 추가</DialogTitle>
          <DialogDescription className={'sr-only'}>추가할 링크 정보를 입력합니다.</DialogDescription>
        </DialogHeader>
        <Text className={'text-muted-foreground text-[12px] font-medium md:text-[14px]'}>
          추가할 링크 정보를 입력해주세요
        </Text>
        <form className={'flex flex-col gap-4'}>
          <InputBox labelName={'링크 제목'} placeholder={'링크 제목'} className={'w-full'} />
          <InputBox labelName={'링크 주소'} placeholder={'링크 주소'} className={'w-full'} />
          <Button type={'submit'}>등록</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
