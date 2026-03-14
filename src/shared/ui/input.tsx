import clsx from 'clsx'
import type { ComponentProps } from 'react'

export const Input = ({ ...props }: ComponentProps<'input'>) => {
  return (
    <input
      {...props}
      className={clsx(
        'font-pretendard border-b-2 border-b-gray-300 py-[10px] text-[14px] font-medium text-gray-900 outline-0 placeholder:text-gray-400 md:text-[18px]',
        props.className,
      )}
      autoComplete="off"
    />
  )
}
