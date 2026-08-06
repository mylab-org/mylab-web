import { cn } from '@/shared/lib'
import { Input as ShadcnInput } from '@/shared/ui/shadcn/input'
import type { ComponentProps } from 'react'

type InputProps = ComponentProps<typeof ShadcnInput>

export const Input = ({ className, autoComplete = 'off', ...props }: InputProps) => {
  return (
    <ShadcnInput
      {...props}
      autoComplete={autoComplete}
      className={cn(
        'h-auto rounded-none border-0 border-b-2 border-b-gray-300 bg-transparent px-0 py-2.5 text-[14px] font-medium text-gray-900 shadow-none',
        'placeholder:text-gray-400',
        'focus-visible:border-b-gray-300 focus-visible:ring-0',
        'disabled:bg-transparent',
        'aria-invalid:border-b-destructive aria-invalid:ring-0',
        'md:text-[18px]',
        className,
      )}
    />
  )
}
