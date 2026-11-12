'use client'

import type { LabsMembersResponseType } from '@/entities/labs/model/types'
import { cn } from '@/shared/lib'
import { Text } from '@/shared/ui/override/text'

interface MemberSelectProps {
  members: LabsMembersResponseType[]
  selected: number[]
  onChange: (selected: number[]) => void
  className?: string
}

const GROUP_OPTIONS: { label: string; degree: UserDegreeType | null }[] = [
  { label: '전체', degree: null },
  { label: '박사 모두', degree: 'DOCTOR' },
  { label: '석사 모두', degree: 'MASTER' },
  { label: '학사 모두', degree: 'BACHELOR' },
]

export const MemberSelect = ({ members, selected, onChange, className }: MemberSelectProps) => {
  const toggleMember = (userId: number) => {
    onChange(selected.includes(userId) ? selected.filter(id => id !== userId) : [...selected, userId])
  }

  const handleGroupClick = (degree: UserDegreeType | null) => {
    const targetIds = members.filter(member => degree === null || member.degree === degree).map(member => member.userId)
    if (targetIds.length === 0) return

    const isAllSelected = targetIds.every(id => selected.includes(id))
    onChange(isAllSelected ? selected.filter(id => !targetIds.includes(id)) : [...new Set([...selected, ...targetIds])])
  }

  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      <Text className={'text-[14px] font-bold'}>참가인원</Text>
      <div className={'flex flex-wrap gap-1.75'}>
        {GROUP_OPTIONS.map(({ label, degree }) => (
          <button
            key={label}
            type={'button'}
            className={'text-brand hover:bg-muted cursor-pointer rounded-full px-2.5 py-1 text-[13px] font-semibold'}
            onClick={() => handleGroupClick(degree)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className={'flex flex-wrap gap-1.75'}>
        {members.map(member => {
          const isSelected = selected.includes(member.userId)
          return (
            <button
              key={member.userId}
              type={'button'}
              aria-pressed={isSelected}
              className={cn(
                'cursor-pointer rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors',
                isSelected ? 'bg-brand text-brand-foreground' : 'bg-muted text-muted-foreground hover:bg-secondary',
              )}
              onClick={() => toggleMember(member.userId)}
            >
              {member.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
