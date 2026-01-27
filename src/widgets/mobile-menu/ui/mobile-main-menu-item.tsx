import clsx from 'clsx'

interface MobileMenuItemProps {
  children: React.ReactNode
  type: 'home' | 'member' | 'notice'
  itemType: 'home' | 'member' | 'notice'
  onMenuClick: () => void
}

export const MobileMenuItem = ({ itemType, onMenuClick, children, type }: MobileMenuItemProps) => {
  return (
    <button
      className={clsx(
        'font-pretendard cursor-pointer rounded-[20px] px-[12px] py-[5px] text-[14px] leading-[22px]',
        type === itemType ? 'bg-gray900 text-white' : 'bg-white text-black',
      )}
      onClick={onMenuClick}
    >
      {children}
    </button>
  )
}
