import clsx from 'clsx'

interface ActiveBtnProps {
  children: React.ReactNode
  className?: string
  active?: boolean
}

export const ActiveBtn = ({ active = false, className, children }: ActiveBtnProps) => {
  return (
    <button
      className={clsx(
        'font-pretendard min-w-[80px] cursor-pointer rounded-[10px] px-[10px] py-[5px] text-center text-[12px] font-semibold md:text-[16px]',
        active ? 'text-gray900 bg-gray-200' : 'text-gray400',
        className,
      )}
    >
      {children}
    </button>
  )
}
