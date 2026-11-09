'use client'

import { cn } from '@/shared/lib'
import {
  Dialog as ShadcnDialog,
  DialogClose as ShadcnDialogClose,
  DialogContent as ShadcnDialogContent,
  DialogDescription as ShadcnDialogDescription,
  DialogFooter as ShadcnDialogFooter,
  DialogHeader as ShadcnDialogHeader,
  DialogTitle as ShadcnDialogTitle,
  DialogTrigger as ShadcnDialogTrigger,
} from '@/shared/ui/shadcn/dialog'
import type { ComponentProps } from 'react'

export const Dialog = ShadcnDialog
export const DialogTrigger = ShadcnDialogTrigger
export const DialogClose = ShadcnDialogClose
export const DialogHeader = ShadcnDialogHeader
export const DialogFooter = ShadcnDialogFooter

type DialogContentProps = ComponentProps<typeof ShadcnDialogContent>

export const DialogContent = ({ className, showCloseButton = true, ...props }: DialogContentProps) => {
  return (
    <ShadcnDialogContent
      showCloseButton={showCloseButton}
      className={cn(
        'bg-card text-foreground max-h-[calc(100dvh-2rem)] w-full gap-5 overflow-y-auto rounded-[20px] p-6 sm:max-w-120',
        className,
      )}
      {...props}
    />
  )
}

type DialogTitleProps = ComponentProps<typeof ShadcnDialogTitle>

export const DialogTitle = ({ className, ...props }: DialogTitleProps) => {
  return (
    <ShadcnDialogTitle className={cn('text-foreground text-[20px] font-bold md:text-[24px]', className)} {...props} />
  )
}

type DialogDescriptionProps = ComponentProps<typeof ShadcnDialogDescription>

export const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => {
  return (
    <ShadcnDialogDescription className={cn('text-muted-foreground text-[14px] font-medium', className)} {...props} />
  )
}
