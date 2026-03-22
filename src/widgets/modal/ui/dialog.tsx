'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Image } from 'next/dist/client/image-component'
import { useLockBodyScroll } from '@/shared/model'
import { useDialogStore } from '@/shared/store/useDialogStore'
import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'

export const Dialog = () => {
  const btnText = useDialogStore(state => state.btnText)
  const item = useDialogStore(state => state.item)
  const isOpen = useDialogStore(state => state.isOpen)
  const closeDialogModal = useDialogStore(state => state.closeDialogModal)
  const callback = useDialogStore(state => state.callback)

  useLockBodyScroll(isOpen)

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      closeDialogModal()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          onClick={handleClose}
          className={'fixed inset-0 z-10 flex h-dvh w-full items-center justify-center bg-black/10'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={'relative flex flex-col rounded-[20px] bg-white shadow-lg'}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1], // iOS 느낌
            }}
          >
            <div className={'flex w-[300px] flex-col p-5 md:w-[600px]'}>
              <div className={'flex flex-1 items-center justify-between'}>
                <h3 className={'text-[16px] font-bold lg:text-[20px]'}>{item.title}</h3>
                <Image
                  src={'icon/x.svg'}
                  alt={''}
                  width={30}
                  height={30}
                  className={'block shrink-0 cursor-pointer'}
                  onClick={handleClose}
                />
              </div>
              <div className={'flex flex-col gap-2.5 py-5'}>
                <Text className={'text-[12px] font-medium whitespace-pre-wrap text-gray-600! md:text-[14px]'}>
                  {item.description}
                </Text>
                {item.etc && (
                  <Text className={'text-[12px] font-bold whitespace-pre-wrap text-gray-600! md:text-[14px]'}>
                    {item.etc}
                  </Text>
                )}
              </div>
              <Button onClick={callback}>{btnText}</Button>
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
