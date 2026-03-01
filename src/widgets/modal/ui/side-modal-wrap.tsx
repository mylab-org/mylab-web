import { motion, AnimatePresence } from 'framer-motion'

interface SideModalWrapProps {
  children: React.ReactNode
  activeBtn?: React.ReactNode
  onClose?: () => void
  isOpen: boolean
}

export const SideModalWrap = ({ activeBtn, children, onClose, isOpen }: SideModalWrapProps) => {
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
          className={
            'bg-gray900/20 absolute top-0 right-0 flex h-full w-full items-end overflow-hidden lg:rounded-l-[20px]'
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={'flex w-full flex-col rounded-t-[24px] bg-white px-[20px] lg:px-[40px]'}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1], // iOS 느낌
            }}
          >
            <div className={'flex items-center justify-center py-[10px]'}>
              <div className={'h-[10px] w-[200px] cursor-pointer rounded-[10px] bg-gray-200'} onClick={handleClose} />
            </div>
            {children}
            {activeBtn && activeBtn}
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
