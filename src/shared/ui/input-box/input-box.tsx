import { forwardRef } from 'react'
import { cn } from '@/shared/lib'
import { Text } from '@/shared/ui/text'
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
            'group-focus-within:text-main absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold tracking-widest uppercase transition-colors',
            isError ? 'text-error group-focus-within:text-error' : 'group-focus-within:text-main text-gray-400',
          )}
        >
          {labelName}
        </label>
        <input
          {...props}
          ref={ref}
          id={inputId}
          type="text"
          className={cn(
            'w-full rounded-2xl border-2 px-5 py-4.5 text-sm font-medium transition-all outline-none focus:ring-0',
            isError
              ? 'text-error focus:text-error border-error focus:border-error placeholder:text-gray-300'
              : 'focus:border-main border-gray-100 text-gray-900 placeholder:text-gray-300 focus:text-gray-900',
          )}
        />
        {isError && <Text className={'text-error text-[12px]'}>{errorMsg}</Text>}
      </div>
    )
  },
)
