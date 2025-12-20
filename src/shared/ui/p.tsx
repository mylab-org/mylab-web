import clsx from 'clsx'
import type { ComponentProps } from 'react'

export const P = ({ ...props }: ComponentProps<'p'>) => {
  return (
    <p {...props} className={clsx('font-pretendard text-gray900', props.className)}>
      {props.children}
    </p>
  )
}
