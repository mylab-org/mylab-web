interface MoreMenuBtnProps {
  children: React.ReactNode
  className?: string
  isGray?: boolean
  onClick?: () => void
}

export const MoreMenuBtn = ({ children, className, isGray = false, onClick }: MoreMenuBtnProps) => {
  return (
    <button
      className={`${className} font-pretendard cursor-pointer text-left text-[12px] font-medium md:text-[16px] ${isGray ? 'text-gray-400' : 'text-gray-900'}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
