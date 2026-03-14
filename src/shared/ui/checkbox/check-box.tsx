import { cn } from '@/shared/lib'

interface CheckBoxProps {
  title: string
  className?: string
  after?: boolean
}

export const CheckBox = ({ title, className, after = false }: CheckBoxProps) => {
  return (
    <label
      htmlFor="checkbox"
      className={cn(
        'flex items-center gap-[12px] text-[12px] font-medium md:text-[14px]',
        after && 'after:ml-2 after:text-gray-300 after:content-["|"]',
        className,
      )}
    >
      <input id={'checkbox'} type="checkbox" />
      {title}
    </label>
  )
}
