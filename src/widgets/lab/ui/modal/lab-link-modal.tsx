'use client'
'use no memo'

import { useEffect } from 'react'
import { useLabsLinkHook } from '@/features/labs'
import { Button } from '@/shared/ui/override/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/override/dialog'
import { Text } from '@/shared/ui/override/text'
import { InputBox } from '@/shared/ui/template/input-box'

interface LabLinkModal {
  onClose?: () => void
  isOpen: boolean
  labId?: number
}

export const LabLinkModal = ({ onClose, isOpen, labId }: LabLinkModal) => {
  const { register, errors, isValid, isAdding, onSubmit, reset } = useLabsLinkHook({
    labId,
    onAddSuccess: () => onClose?.(),
  })

  useEffect(() => {
    if (!isOpen) reset()
  }, [isOpen, reset])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => {
        if (!open) onClose?.()
      }}
    >
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
            disabled={isAdding}
            isError={!!errors.name}
            errorMsg={errors.name?.message}
            {...register('name', {
              required: '링크 제목을 입력해주세요.',
              maxLength: { value: 50, message: '링크 제목은 50자 이하여야 합니다.' },
            })}
          />
          <InputBox
            labelName={'링크 주소'}
            placeholder={'https://example.com'}
            className={'w-full'}
            disabled={isAdding}
            isError={!!errors.url}
            errorMsg={errors.url?.message}
            {...register('url', {
              required: '링크 주소를 입력해주세요.',
              pattern: {
                value: /^https?:\/\/.+/,
                message: '올바른 링크 주소를 입력해주세요. (http:// 또는 https:// 포함)',
              },
            })}
          />
          <Button type={'submit'} disabled={!isValid || isAdding}>
            {isAdding ? '등록 중...' : '등록'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
