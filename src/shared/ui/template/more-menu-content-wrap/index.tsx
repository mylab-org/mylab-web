import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'

interface MoreMenuWrapProps {
  title: string
  children: React.ReactNode
  isMobile?: boolean
}

export const MoreMenuContentWrap = ({ title, children, isMobile = false }: MoreMenuWrapProps) => {
  return (
    <div className={cn('bg-card flex flex-col gap-4 rounded-[20px]', CARD_SHADOW, isMobile ? 'gap-3.5 p-4' : 'p-5')}>
      <h3 className={'text-foreground text-[16px] font-bold md:text-[20px]'}>{title}</h3>
      {children}
    </div>
  )
}
