'use client'

import { useId, type ComponentProps } from 'react'
import { cn } from '@/shared/lib'
import { Checkbox } from '@/shared/ui/shadcn/checkbox'

type CheckBoxProps = {
  title: string
  className?: string
  after?: boolean
} & Omit<ComponentProps<typeof Checkbox>, 'className'>

export const CheckBox = ({ title, className, after = false, id, ...props }: CheckBoxProps) => {
  const generatedId = useId()
  const checkboxId = id ?? generatedId

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        'flex cursor-pointer items-center gap-3 text-[12px] font-medium md:text-[14px]',
        after && 'after:ml-2 after:text-gray-300 after:content-["|"]',
        className,
      )}
    >
      <Checkbox id={checkboxId} {...props} />
      {title}
    </label>
  )
}
