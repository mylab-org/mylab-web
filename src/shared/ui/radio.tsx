import type { ComponentProps } from 'react'

type RadioBtnProps = {
  title: string
} & ComponentProps<'input'>

export const Radio = ({ title, ...props }: RadioBtnProps) => {
  return (
    <label
      htmlFor={props.id}
      className="text-gray5 font-pretendard flex cursor-pointer items-center gap-[5px] text-[13px] font-bold"
    >
      <input {...props} id={props.id} type="radio" className={'peer hidden'} />
      <span className="bg-gray300 peer-checked:bg-gray700 flex h-[24px] w-[24px] items-center justify-center rounded-full">
        {/*<span className="hidden h-2.5 w-2.5 rounded-full bg-blue-500 peer-checked:block" />*/}
      </span>
      {title}
    </label>
  )
}
