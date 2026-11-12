'use client'
'use no memo'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { useLabsLinkHook } from '@/features/labs'
import { useLockBodyScroll } from '@/shared/model'
import { Button } from '@/shared/ui/override/button'
import { Input } from '@/shared/ui/override/input'
import { Text } from '@/shared/ui/override/text'

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

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      onClose?.()
    }
  }

  useLockBodyScroll(isOpen)

  useEffect(() => {
    return () => {
      onClose?.()
    }
  }, [])

  useEffect(() => {
    if (!isOpen) reset()
  }, [isOpen, reset])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          onClick={handleClose}
          className={'fixed inset-0 z-50 flex h-dvh w-full items-center justify-center bg-black/10'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={'bg-card text-foreground relative flex flex-col rounded-[20px] shadow-lg'}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1], // iOS 느낌
            }}
          >
            <div className={'flex w-[300px] flex-col gap-2.5 p-7.5 md:w-[600px]'}>
              <div className={'flex flex-1 items-center justify-between'}>
                <h3 className={'text-[16px] font-bold lg:text-[20px]'}>링크 추가</h3>
                <X className={'text-muted-foreground h-5 w-5 cursor-pointer'} onClick={onClose} />
              </div>
              <form className={'flex flex-col gap-2.5'} onSubmit={onSubmit}>
                <Text className={'text-muted-foreground text-[12px] font-medium md:text-[14px]'}>
                  추가할 링크 정보를 입력해주세요
                </Text>
                <Input
                  placeholder={'링크 제목'}
                  aria-invalid={!!errors.name}
                  {...register('name', {
                    required: '링크 제목을 입력해주세요.',
                    maxLength: { value: 50, message: '링크 제목은 50자 이하여야 합니다.' },
                  })}
                />
                {errors.name && <Text className={'text-error text-[12px]'}>{errors.name.message}</Text>}
                <Input
                  placeholder={'링크 주소'}
                  aria-invalid={!!errors.url}
                  {...register('url', {
                    required: '링크 주소를 입력해주세요.',
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: '올바른 링크 주소를 입력해주세요. (http:// 또는 https:// 포함)',
                    },
                  })}
                />
                {errors.url && <Text className={'text-error text-[12px]'}>{errors.url.message}</Text>}
                <Button type={'submit'} disabled={!isValid || isAdding}>
                  {isAdding ? '등록 중...' : '등록'}
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
