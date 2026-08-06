'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useLockBodyScroll } from '@/shared/model'
import { useAlertStore } from '@/shared/store'
import { Button } from '@/shared/ui/override/button'
import { Text } from '@/shared/ui/override/text'

export const Alert = () => {
  const isOpen = useAlertStore(state => state.isAlert)
  const msg = useAlertStore(state => state.msg)
  const onCloseAlert = useAlertStore(state => state.onCloseAlert)

  useLockBodyScroll(isOpen)

  useEffect(() => {
    return () => {
      onCloseAlert()
    }
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          // className={clsx('fixed inset-0 z-[2000] flex h-[100dvh] w-full items-center justify-center bg-black/50')}
          className={'fixed inset-0 z-50 flex h-dvh w-full items-center justify-center bg-black/10'}
          onClick={onCloseAlert}
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
            <div className="flex w-full flex-1 items-center justify-center p-7.5">
              <Text className="text-center font-semibold whitespace-pre-line text-black">{msg}</Text>
            </div>
            <Button className="w-full rounded-none rounded-b-[20px]">확인</Button>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
