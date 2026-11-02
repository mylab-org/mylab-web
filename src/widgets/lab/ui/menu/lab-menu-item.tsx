import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { Text } from '@/shared/ui/override/text'

type LabTopMenu = {
  name: string
  children: React.ReactNode
  onClick: () => void
  compact?: boolean
}

export const LabMenuItem = ({ children, name, onClick, compact = false }: LabTopMenu) => {
  return (
    <div
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center gap-1 rounded-[12px] bg-white md:rounded-[16px]',
        CARD_SHADOW,
        compact ? 'min-w-0 flex-1 px-1 py-2 xl:px-2 xl:py-2.5' : 'w-[150px] flex-1 p-1.25 md:px-5 md:py-2.5',
      )}
      onClick={onClick}
    >
      <div className={cn(compact ? 'h-4 w-4 md:h-5 md:w-5' : 'h-4 w-4 md:h-7.5 md:w-7.5')}>{children}</div>
      <Text
        className={cn(
          'text-center font-bold break-keep',
          compact ? 'text-[10px] leading-tight md:text-[12px]' : 'text-[10px] md:text-[18px]',
        )}
      >
        {name}
      </Text>
    </div>
  )
}
