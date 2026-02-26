interface SideModalWrapProps {
  children: React.ReactNode
  activeBtn?: React.ReactNode
  onClose?: () => void
}

export const SideModalWrap = ({ activeBtn, children, onClose }: SideModalWrapProps) => {
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      onClose?.()
    }
  }

  return (
    <section
      className={
        'bg-gray900/20 absolute top-0 right-0 flex h-full w-full items-end overflow-hidden lg:rounded-l-[20px]'
      }
      onClick={handleClose}
    >
      <div className={'flex w-full flex-col rounded-t-[24px] bg-white px-[20px] lg:px-[40px]'}>
        <div className={'flex items-center justify-center py-[10px]'}>
          <div className={'h-[10px] w-[200px] cursor-pointer rounded-[10px] bg-gray-200'} onClick={handleClose} />
        </div>
        {children}
        {activeBtn && activeBtn}
      </div>
    </section>
  )
}
