'use client'

import { cn } from '@/shared/lib'
import { RadioGroup as ShadcnRadioGroup, RadioGroupItem } from '@/shared/ui/shadcn/radio-group'
import type { ComponentProps } from 'react'

type RadioGroupProps = ComponentProps<typeof ShadcnRadioGroup>

export const RadioGroup = ({ className, ...props }: RadioGroupProps) => {
  return <ShadcnRadioGroup className={cn('flex w-auto gap-5', className)} {...props} />
}

type RadioProps = {
  title: string
  id?: string
  value: string
  className?: string
  disabled?: boolean
}

export const Radio = ({ title, id, value, className, disabled }: RadioProps) => {
  return (
    <label
      htmlFor={id}
      className={cn('text-foreground flex cursor-pointer items-center gap-1.25 text-[13px] font-bold', className)}
    >
      <RadioGroupItem
        id={id}
        value={value}
        disabled={disabled}
        className={cn(
          'bg-muted size-5 border-0 shadow-none after:hidden',
          'data-checked:bg-foreground data-checked:border-0',
          'focus-visible:border-0 focus-visible:ring-0',
          '**:data-[slot=radio-group-indicator]:hidden',
        )}
      />
      {title}
    </label>
  )
}
