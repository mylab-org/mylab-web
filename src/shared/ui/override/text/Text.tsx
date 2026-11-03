import { cn } from '@/shared/lib'
import type { ComponentProps } from 'react'

export const Text = ({ ...props }: ComponentProps<'p'>) => {
  return (
    <p {...props} className={cn('text-foreground', props.className)}>
      {props.children}
    </p>
  )
}
