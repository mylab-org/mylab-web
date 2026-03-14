import { motion, AnimatePresence } from 'framer-motion'
import { Image } from 'next/dist/client/image-component'
import { Input, Text } from '@/shared/ui'
import { Button } from '@/shared/ui/button'

interface LabLinkModal {
  onClose?: () => void
  isOpen: boolean
}

export const LabLinkModal = ({ onClose, isOpen }: LabLinkModal) => {
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      onClose?.()
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
            <div className={'flex w-[300px] flex-col gap-[10px] p-[30px] md:w-[600px]'}>
              <div className={'flex flex-1 items-center justify-between'}>
                <h3 className={'font-pretendard text-[16px] font-bold lg:text-[20px]'}>링크 추가</h3>
                <Image
                  src={'icon/x.svg'}
                  alt={''}
                  width={30}
                  height={30}
                  className={'block shrink-0 cursor-pointer'}
                  onClick={onClose}
                />
              </div>
              <form className={'flex flex-col gap-[10px]'}>
                <Text className={'text-[12px] font-medium text-gray-600! md:text-[14px]'}>
                  추가할 링크 정보를 입력해주세요
                </Text>
                <Input placeholder={'링크 제목'} />
                <Input placeholder={'링크 주소'} />
                <Button>등록</Button>
              </form>
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
