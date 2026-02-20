import clsx from 'clsx'
import type { ComponentProps } from 'react'

export const Text = ({ ...props }: ComponentProps<'p'>) => {
  return (
    <p {...props} className={clsx('font-pretendard text-gray900', props.className)}>
      {props.children}
    </p>
  )
}
