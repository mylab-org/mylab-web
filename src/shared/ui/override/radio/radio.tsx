'use client'

import { cn } from '@/shared/lib'
import { RadioGroup as ShadcnRadioGroup, RadioGroupItem } from '@/shared/ui/shadcn/radio-group'
import type { ComponentProps } from 'react'

type RadioGroupProps = ComponentProps<typeof ShadcnRadioGroup>

export const RadioGroup = ({ className, ...props }: RadioGroupProps) => {
  return <ShadcnRadioGroup className={cn('flex w-auto flex-wrap gap-3', className)} {...props} />
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
      className={cn(
        'text-foreground hover:bg-muted/60 flex cursor-pointer items-center gap-2 rounded-[10px] px-2.5 py-1.5 text-[13px] font-semibold transition-colors',
        'has-disabled:cursor-not-allowed has-disabled:opacity-50',
        'has-data-checked:text-brand',
        className,
      )}
    >
      <RadioGroupItem
        id={id}
        value={value}
        disabled={disabled}
        className={cn(
          'border-border bg-card size-5 shrink-0 rounded-full border-2 shadow-none after:hidden',
          'transition-[border-color,box-shadow] duration-150',
          'hover:border-brand/40',
          'data-checked:border-brand data-checked:bg-card',
          'data-checked:shadow-[inset_0_0_0_4.5px_var(--card),inset_0_0_0_9px_var(--brand)]',
          'focus-visible:ring-brand/25 focus-visible:border-brand focus-visible:ring-2 focus-visible:outline-none',
          '**:data-[slot=radio-group-indicator]:hidden',
        )}
      />
      {title}
    </label>
  )
}
