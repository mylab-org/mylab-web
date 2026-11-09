import { ChevronRight } from 'lucide-react'
import { cn } from '@/shared/lib'
import { Text } from '@/shared/ui/override/text'

type MoreMenuRowProps = {
  label: string
  onClick?: () => void
  disabled?: boolean
  upcoming?: boolean
  destructive?: boolean
}

export const MoreMenuRow = ({
  label,
  onClick,
  disabled = false,
  upcoming = false,
  destructive = false,
}: MoreMenuRowProps) => {
  const isDisabled = disabled || upcoming

  return (
    <button
      type={'button'}
      disabled={isDisabled}
      onClick={onClick}
      className={cn(
        'flex w-full items-center justify-between gap-3 rounded-[12px] px-1 py-2.5 text-left transition-colors',
        isDisabled ? 'cursor-not-allowed' : 'hover:bg-muted cursor-pointer',
      )}
    >
      <Text
        className={cn(
          'text-[13px] font-medium md:text-[15px]',
          destructive && !isDisabled ? 'text-error!' : isDisabled ? 'text-subtle-foreground!' : 'text-foreground!',
        )}
      >
        {label}
      </Text>
      {upcoming ? (
        <span className={'bg-muted text-subtle-foreground shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold'}>
          준비 중
        </span>
      ) : (
        <ChevronRight className={cn('h-4 w-4 shrink-0', destructive ? 'text-error/60' : 'text-muted-foreground/50')} />
      )}
    </button>
  )
}
