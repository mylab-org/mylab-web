import { cn } from '@/shared/lib'
import type { TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

export const Textarea = ({ className, ...rest }: TextAreaProps) => {
  return <textarea {...rest} className={cn('resize-none font-medium outline-0 placeholder:text-gray-400', className)} />
}
