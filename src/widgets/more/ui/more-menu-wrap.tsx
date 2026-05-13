interface MoreMenuWrapProps {
  title: string
  children: React.ReactNode
  isMobile?: boolean
}

export const MoreMenuWrap = ({ title, children, isMobile = false }: MoreMenuWrapProps) => {
  return (
    <div
      className={`${isMobile ? 'p-3' : 'p-5'} flex flex-col gap-5 rounded-[12px] bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.03),0px_4px_16px_rgba(0,0,0,0.04)]`}
    >
      <h3 className={'text-[16px] font-bold md:text-[22px]'}>{title}</h3>
      {children}
    </div>
  )
}
