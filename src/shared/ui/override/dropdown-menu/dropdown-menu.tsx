'use client'

import { cn } from '@/shared/lib'
import {
  DropdownMenu as ShadcnDropdownMenu,
  DropdownMenuContent as ShadcnDropdownMenuContent,
  DropdownMenuItem as ShadcnDropdownMenuItem,
  DropdownMenuTrigger as ShadcnDropdownMenuTrigger,
} from '@/shared/ui/shadcn/dropdown-menu'
import type { ComponentProps } from 'react'

export const DropdownMenu = ShadcnDropdownMenu
export const DropdownMenuTrigger = ShadcnDropdownMenuTrigger

type DropdownMenuContentProps = ComponentProps<typeof ShadcnDropdownMenuContent>

export const DropdownMenuContent = ({ className, ...props }: DropdownMenuContentProps) => {
  return (
    <ShadcnDropdownMenuContent
      className={cn(
        'bg-popover text-popover-foreground border-border z-[60] min-w-[120px] rounded-[12px] border p-1.25 shadow-lg',
        className,
      )}
      {...props}
    />
  )
}

type DropdownMenuItemProps = ComponentProps<typeof ShadcnDropdownMenuItem>

export const DropdownMenuItem = ({ className, ...props }: DropdownMenuItemProps) => {
  return (
    <ShadcnDropdownMenuItem
      className={cn(
        'text-foreground focus:bg-muted focus:text-foreground cursor-pointer rounded-[8px] px-2.5 py-2 text-[14px] font-medium',
        'data-[variant=destructive]:text-error data-[variant=destructive]:focus:text-error data-[variant=destructive]:focus:bg-muted',
        className,
      )}
      {...props}
    />
  )
}
