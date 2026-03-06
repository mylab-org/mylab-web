import clsx from 'clsx'

interface CheckBoxProps {
  title: string
  className?: string
  after?: boolean
}

export const CheckBox = ({ title, className, after = false }: CheckBoxProps) => {
  return (
    <label
      htmlFor="checkbox"
      className={clsx(
        'font-pretendard flex items-center gap-[12px] text-[14px] font-medium',
        after && 'after:ml-2 after:text-gray-300 after:content-["|"]',
        className,
      )}
    >
      <input id={'checkbox'} type="checkbox" />
      {title}
    </label>
  )
}
