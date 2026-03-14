'use client'

// import Link from 'next/link'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/ui/button/index'
import type { ButtonHTMLAttributes } from 'react'

// type Props = {
//   children?: React.ReactNode
//   variant?: 'primary' | 'error' | 'noActive'
// } & ComponentProps<'button'>
//
// export const Button = ({ children, variant = 'primary', ...props }: Props) => {
//   const base = ' rounded-[10px] text-[14px] lg:text-[16px] text-white font-bold px-[20px] py-[10px]'
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
  onClick?: (e: React.MouseEvent) => void
}

interface MenuButtonProps extends BaseButtonProps {
  isGray?: boolean
  onClick?: (e: React.MouseEvent) => void
}

interface SetupButtonProps extends BaseButtonProps {
  isActive?: boolean
  onClick?: (e: React.MouseEvent) => void
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
  const base =
    'flex items-center justify-center gap-[5px] rounded-[10px] text-[14px] lg:text-[16px] text-white font-bold px-[20px] py-[10px] cursor-pointer'

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
      className={cn('font-medium', icon && 'flex items-center gap-[5px]', rest.className)}
      style={width ? { width } : undefined}
    >
      {content}
    </Link>
  )
}

export const ButtonMenu = ({ children, isGray = false, width, ...rest }: MenuButtonProps) => {
  return (
    <button
      {...rest}
      className={cn(
        'cursor-pointer text-left text-[12px] font-medium md:text-[16px]',
        isGray ? 'text-gray-400' : 'text-black',
        rest.className,
      )}
      style={width ? { width } : undefined}
    >
      {children}
    </button>
  )
}

export const ButtonSetup = ({ children, isActive = false, ...rest }: SetupButtonProps) => {
  return (
    <button
      {...rest}
      className={cn(
        'min-w-[80px] cursor-pointer rounded-[10px] px-[10px] py-[5px] text-center text-[12px] font-semibold md:text-[16px]',
        isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-400',
        rest.className,
      )}
    >
      {children}
    </button>
  )
}
