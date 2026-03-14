'use client'

// import Link from 'next/link'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/shared/lib'
import type { ButtonHTMLAttributes } from 'react'

// type Props = {
//   children?: React.ReactNode
//   variant?: 'primary' | 'error' | 'noActive'
// } & ComponentProps<'button'>
//
// export const Button = ({ children, variant = 'primary', ...props }: Props) => {
//   const base = 'font-pretendard rounded-[10px] text-[14px] lg:text-[16px] text-white font-bold px-[20px] py-[10px]'
//   const variants = {
//     primary: 'bg-gray-700 cursor-pointer',
//     error: 'bg-error',
//     noActive: 'bg-gray-300',
//   }
//   return (
//     <button {...props} className={clsx(base, variants[variant], props.className)} disabled={variant === 'noActive'}>
//       {children}
//     </button>
//   )
// }

type Color = 'black' | 'primary' | 'secondary' | 'error' | 'none'
type IconPosition = 'before' | 'after'

interface BaseButtonProps {
  children?: React.ReactNode
  disabled?: boolean
  color?: Color
  iconPosition?: IconPosition
  icon?: React.ReactNode
  width?: string
  className?: string
}

interface ButtonRootProps
  extends BaseButtonProps, Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type' | 'form'> {}

interface LinkButtonProps extends BaseButtonProps {
  href: string
  target?: '_black'
  onclick?: (e: React.MouseEvent) => void
}

const colorVariants: Record<Color, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  black: 'bg-black',
  error: 'bg-error',
  none: '',
}

export const ButtonRoot = ({
  children,
  color = 'primary',
  icon,
  iconPosition = 'before',
  disabled,
  width,
  ...rest
}: ButtonRootProps) => {
  const base = 'rounded-[10px] text-[14px] lg:text-[16px] text-white font-bold px-[20px] py-[10px] cursor-pointer'

  const content =
    iconPosition === 'after' ? (
      <>
        {children}
        {icon}
      </>
    ) : (
      <>
        {icon}
        {children}
      </>
    )

  return (
    <button
      {...rest}
      className={cn(base, colorVariants[color], disabled && 'cursor-not-allowed bg-gray-300', rest.className)}
      style={width ? { width } : undefined}
      disabled={disabled}
    >
      {content}
    </button>
  )
}

export const ButtonLink = ({
  children,
  href,
  target = '_black',
  icon,
  iconPosition = 'before',
  disabled,
  width,
  ...rest
}: LinkButtonProps) => {
  const content =
    iconPosition === 'after' ? (
      <>
        {children}
        {icon}
      </>
    ) : (
      <>
        {icon}
        {children}
      </>
    )

  return (
    <Link
      {...rest}
      href={href}
      target={target}
      aria-disabled={disabled}
      className={cn('font-medium', rest.className)}
      style={width ? { width } : undefined}
    >
      {content}
    </Link>
  )
}
