import type { ComponentProps } from 'react'

type RadioBtnProps = {
  title: string
} & ComponentProps<'input'>

export const Radio = ({ title, ...props }: RadioBtnProps) => {
  return (
    <label htmlFor={props.id} className="text-gray5 flex cursor-pointer items-center gap-1.25 text-[13px] font-bold">
      <input {...props} id={props.id} type="radio" className={'peer hidden'} />
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 peer-checked:bg-gray-700">
        {/*<span className="z-5 hidden h-2.5 w-2.5 rounded-full bg-blue-500 peer-checked:block" />*/}
      </span>
      {title}
    </label>
  )
}
