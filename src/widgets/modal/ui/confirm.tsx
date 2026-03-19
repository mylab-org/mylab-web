'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useConfirmStore } from '@/shared/store'
import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          className={'fixed inset-0 z-50 flex h-dvh w-full items-center justify-center bg-black/10'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="flex min-w-[250px] flex-col items-center justify-center rounded-[20px] bg-white"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1], // iOS 느낌
            }}
          >
            <div className="flex w-full flex-1 items-center justify-center p-12.5">
              <Text className="font-semibold text-black">{msg}</Text>
            </div>
            <div className="flex w-full">
              <Button className="w-full rounded-none rounded-bl-[20px]" onClick={onTrue}>
                확 인
              </Button>
              <Button className="w-full rounded-none rounded-br-[20px]" color="error" onClick={onFalse}>
                닫 기
              </Button>
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
