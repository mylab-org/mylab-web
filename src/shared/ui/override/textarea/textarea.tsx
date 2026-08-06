import { cn } from '@/shared/lib'
import { Textarea as ShadcnTextarea } from '@/shared/ui/shadcn/textarea'
import type { ComponentProps } from 'react'

type TextareaProps = ComponentProps<typeof ShadcnTextarea>

export const Textarea = ({ className, ...props }: TextareaProps) => {
  return (
    <ShadcnTextarea
      {...props}
      className={cn(
        'min-h-0 resize-none rounded-none border-0 bg-transparent px-0 py-0 font-medium shadow-none',
        'placeholder:text-gray-400',
        'focus-visible:border-0 focus-visible:ring-0',
        'disabled:bg-transparent',
        'aria-invalid:border-destructive aria-invalid:ring-0',
        className,
      )}
    />
  )
}
