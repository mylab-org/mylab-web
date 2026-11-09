import { forwardRef } from 'react'
import { cn } from '@/shared/lib'
import { Text } from '@/shared/ui/override/text'
import type { ComponentProps } from 'react'

type InputBoxProps = {
  className?: string
  isError?: boolean
  labelName: string
  errorMsg?: string
} & ComponentProps<'input'>

export const InputBox = forwardRef<HTMLInputElement, InputBoxProps>(
  ({ labelName, className, isError, errorMsg, id, ...props }, ref) => {
    const inputId = id ?? props.name

    return (
      <div className={cn('group relative', className)}>
        <label
          htmlFor={inputId}
          className={cn(
            'group-focus-within:text-main bg-card absolute -top-2.5 left-4 px-2 text-[10px] font-bold tracking-widest uppercase transition-colors',
            isError ? 'text-error group-focus-within:text-error' : 'text-muted-foreground group-focus-within:text-main',
          )}
        >
          {labelName}
        </label>
        <input
          {...props}
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-2xl border-2 px-5 py-4.5 text-sm font-medium transition-all outline-none focus:ring-0',
            isError
              ? 'text-error focus:text-error border-error focus:border-error placeholder:text-muted-foreground/50'
              : 'border-border text-foreground placeholder:text-muted-foreground/50 focus:border-main focus:text-foreground',
          )}
        />
        {isError && <Text className={'text-error text-[12px]'}>{errorMsg}</Text>}
      </div>
    )
  },
)
