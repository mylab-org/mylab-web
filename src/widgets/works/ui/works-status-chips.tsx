'use client'

import { cn } from '@/shared/lib'

type StatusChipItem = {
  status: string
  label: string
  count: number
}

type WorksStatusChipsProps = {
  items: StatusChipItem[]
  activeStatus: string
  onChange: (status: string) => void
}

export const WorksStatusChips = ({ items, activeStatus, onChange }: WorksStatusChipsProps) => {
  return (
    <div className={'scrollbar-hidden flex gap-2 overflow-x-auto pb-0.5'}>
      {items.map(item => {
        const isActive = item.status === activeStatus

        return (
          <button
            key={item.status}
            type={'button'}
            onClick={() => onChange(item.status)}
            className={cn(
              'shrink-0 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors',
              isActive ? 'bg-brand text-brand-foreground' : 'bg-muted text-subtle-foreground',
            )}
          >
            {item.label}
            <span className={cn('ml-1', isActive ? 'text-brand-foreground/80' : 'text-subtle-foreground')}>
              {item.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
