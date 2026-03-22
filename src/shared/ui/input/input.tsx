import { cn } from '@/shared/lib'
import type { InputHTMLAttributes, Ref } from 'react'

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>
  className?: string
}

export const Input = ({ ref, className, ...rest }: BaseInputProps) => {
  return (
    <input
      {...rest}
      ref={ref}
      className={cn(
        'border-b-2 border-b-gray-300 py-2.5 text-[14px] font-medium text-gray-900 outline-0 placeholder:text-gray-400 md:text-[18px]',
        className,
      )}
      autoComplete="off"
    />
  )
}
