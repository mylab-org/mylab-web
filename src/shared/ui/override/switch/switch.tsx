'use client'

import { Switch as SwitchPrimitive } from 'radix-ui'
import { cn } from '@/shared/lib'
import type { ReactNode } from 'react'

interface SwitchProps {
  isSwitch: boolean
  onSwitch: () => void
  title?: ReactNode
  description?: ReactNode
  isBetween?: boolean
  className?: string
}

export const Switch = ({ className, onSwitch, isSwitch, title, isBetween = false, description }: SwitchProps) => {
  return (
    <div className={cn('flex flex-col gap-2.5 py-2.5', className)}>
      <div className={cn('flex items-center gap-2', isBetween && 'justify-between')}>
        {title}
        <SwitchPrimitive.Root
          checked={isSwitch}
          onCheckedChange={() => onSwitch()}
          className={cn(
            'relative flex cursor-pointer items-center rounded-full transition-colors duration-200 outline-none',
            'h-3.5 w-5.5 lg:h-6 lg:w-10',
            isSwitch ? 'bg-gray-700' : 'bg-gray-200',
          )}
        >
          <SwitchPrimitive.Thumb
            className={cn(
              'absolute rounded-full bg-white shadow-md transition-transform duration-200',
              'h-2.5 w-2.5 lg:h-4.5 lg:w-4.5',
              isSwitch ? 'translate-x-2.5 lg:translate-x-4.5' : 'translate-x-0.5',
            )}
          />
        </SwitchPrimitive.Root>
      </div>
      {description}
    </div>
  )
}
