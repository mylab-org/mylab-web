import clsx from 'clsx'
import type { ComponentProps } from 'react'

type Props = {
  children?: React.ReactNode
  variant?: 'primary' | 'error' | 'noActive'
} & ComponentProps<'button'>

export const Button = ({ children, variant = 'primary', ...props }: Props) => {
  const base = 'font-pretendard h-[50px] rounded-[10px] text-[16px] text-white font-bold'
  const variants = {
    primary: 'bg-gray700 cursor-pointer',
    error: 'bg-error',
    noActive: 'bg-gray300',
  }
  return (
    <button {...props} className={clsx(base, variants[variant], props.className)}>
      {children}
    </button>
  )
}
