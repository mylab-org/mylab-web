import clsx from 'clsx'
import { Image } from 'next/dist/client/image-component'
import type { ComponentProps } from 'react'

type Props = {
  state?: boolean
  basicSvgName: string
  effectSvgName?: string
} & ComponentProps<'input'>

export const IconInput = ({ state, basicSvgName, effectSvgName, ...props }: Props) => {
  return (
    <div className={clsx('flex gap-[10px] border-b-2', state ? 'border-b-success' : 'border-b-gray-300')}>
      <input
        {...props}
        className={clsx(
          'font-pretendard flex-1 py-[10px] text-[14px] font-medium text-gray-900 outline-0 placeholder:text-gray-400 md:text-[18px]',
          props.className,
        )}
        autoComplete="off"
      />
      {state ? (
        <Image src={effectSvgName!} alt={'effect'} width={24} height={24} />
      ) : (
        <Image src={basicSvgName} alt={'basic'} width={24} height={24} />
      )}
    </div>
  )
}
