import clsx from 'clsx'
import { type ComponentProps, forwardRef } from 'react'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/Text'

type Props = {
  className?: string
  isError?: boolean
  labelName: string
  errorMsg?: string
} & ComponentProps<'input'>

export const FloatingLabel = forwardRef<HTMLInputElement, Props>(
  ({ labelName, className, isError, errorMsg, id, ...props }, ref) => {
    const inputId = id ?? props.name

    return (
      <div className="relative z-0">
        <Input
          {...props}
          ref={ref}
          id={inputId}
          className={clsx('peer block w-full border-b-2', isError ? 'border-b-error!' : 'border-b-gray-300!')}
          placeholder=" "
        />
        <label
          htmlFor={inputId}
          className={clsx(
            'absolute top-0 -z-10 origin-left -translate-y-6 scale-65 transform text-[18px] duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-65',
            isError
              ? 'text-error peer-focus:text-error peer-placeholder-shown:text-gray-400'
              : 'peer-placeholder-shown:text-gray-400 peer-focus:text-gray-900',
          )}
        >
          {labelName}
        </label>
        {isError && <Text className={'text-error! text-[12px]'}>{errorMsg}</Text>}
      </div>
    )
  },
)
