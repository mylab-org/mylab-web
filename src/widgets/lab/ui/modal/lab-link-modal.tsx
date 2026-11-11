'use client'

import { MAX_LINK_NAME_LENGTH } from '@/features/labs/config/const'
import { useLabsLinkCreateFormHook } from '@/features/labs/model/use-labs-link-create-form-hook'
import { Button } from '@/shared/ui/override/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/override/dialog'
import { Text } from '@/shared/ui/override/text'
import { InputBox } from '@/shared/ui/template/input-box'

interface LabLinkModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const LabLinkModal = ({ open, onOpenChange }: LabLinkModalProps) => {
  const { register, onSubmit, isValid, isPending } = useLabsLinkCreateFormHook({
    open,
    onSuccess: () => onOpenChange(false),
  })

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
        <form className={'flex flex-col gap-4'} onSubmit={onSubmit}>
          <InputBox
            labelName={'링크 제목'}
            placeholder={'링크 제목'}
            className={'w-full'}
            maxLength={MAX_LINK_NAME_LENGTH}
            disabled={isPending}
            {...register('name', { required: true, maxLength: MAX_LINK_NAME_LENGTH })}
          />
          <InputBox
            labelName={'링크 주소'}
            placeholder={'https://example.com'}
            className={'w-full'}
            disabled={isPending}
            {...register('url', { required: true })}
          />
          <Button type={'submit'} disabled={!isValid || isPending}>
            {isPending ? '등록 중...' : '등록'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
