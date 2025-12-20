import clsx from 'clsx'
import type { ComponentProps } from 'react'

export const Input = ({ ...props }: ComponentProps<'input'>) => {
  return (
    <input
      {...props}
      className={clsx(
        'border-b-gray300 placeholder:text-gray400 font-pretendard text-gray900 border-b py-[10px] text-[14px] outline-0 md:text-[18px]',
        props.className,
      )}
      autoComplete="off"
    />
  )
}
