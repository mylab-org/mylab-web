import clsx from 'clsx'
import { CircleCheck, Copy } from 'lucide-react'
import type { ComponentProps } from 'react'

type Props = {
  state?: boolean
} & ComponentProps<'input'>

export const IconInput = ({ state, ...props }: Props) => {
  return (
    <div className={clsx('flex items-center gap-2.5 border-b-2', state ? 'border-b-success' : 'border-b-border')}>
      <input
        {...props}
        className={clsx(
          'text-foreground placeholder:text-muted-foreground flex-1 py-2.5 text-[14px] font-medium outline-0 md:text-[18px]',
          props.className,
        )}
        autoComplete="off"
      />
      {state ? <CircleCheck className="text-success h-4 w-4" /> : <Copy className="text-muted-foreground h-4 w-4" />}
    </div>
  )
}
