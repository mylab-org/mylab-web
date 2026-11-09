'use client'

import { useDroppable } from '@dnd-kit/core'
import { cn } from '@/shared/lib'

type DropItem = {
  status: string
  label: string
}

const StatusDropChip = ({ status, label }: DropItem) => {
  const { setNodeRef, isOver } = useDroppable({ id: status })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-semibold',
        isOver
          ? 'border-brand bg-brand text-brand-foreground'
          : 'border-border bg-card text-subtle-foreground border-dashed',
      )}
    >
      {label}
    </div>
  )
}

type WorksMobileStatusDropRowProps = {
  items: DropItem[]
  activeStatus: string
  isDragging: boolean
}

export const WorksMobileStatusDropRow = ({ items, activeStatus, isDragging }: WorksMobileStatusDropRowProps) => {
  if (!isDragging) return null

  const targets = items.filter(item => item.status !== activeStatus)
  if (targets.length === 0) return null

  return (
    <div className={'border-brand/20 bg-brand/5 rounded-[12px] border p-2.5'}>
      <p className={'text-brand mb-2 text-[11px] font-medium'}>다른 상태로 옮기기</p>
      <div className={'scrollbar-hidden flex gap-2 overflow-x-auto'}>
        {targets.map(item => (
          <StatusDropChip key={item.status} status={item.status} label={item.label} />
        ))}
      </div>
    </div>
  )
}
