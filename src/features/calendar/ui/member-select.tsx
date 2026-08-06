'use client'

import { cn } from '@/shared/lib'
import { Text } from '@/shared/ui/override/text'

interface MemberSelectProps {
  /** 선택 가능한 연구실 구성원 이름 */
  members: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  className?: string
}

/** 개별 인원 앞에 붙는 그룹 선택지 */
const GROUP_OPTIONS = ['전체', '박사 모두', '석사 모두', '학사 모두'] as const

export const MemberSelect = ({ members, selected, onChange, className }: MemberSelectProps) => {
  const toggleMember = (name: string) => {
    onChange(selected.includes(name) ? selected.filter(member => member !== name) : [...selected, name])
  }

  const handleGroupClick = (group: (typeof GROUP_OPTIONS)[number]) => {
    // TODO: 구성원 직급 정보가 내려오면 '박사/석사/학사 모두' 도 실제 필터로 연결
    if (group !== '전체') return
    onChange(selected.length === members.length ? [] : members)
  }

  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      <Text className={'text-[16px] font-bold'}>참가인원</Text>
      <div className={'flex flex-wrap gap-1.75'}>
        {GROUP_OPTIONS.map(group => (
          <button
            key={group}
            type={'button'}
            className={
              'cursor-pointer rounded-[20px] px-2.5 py-1 text-[14px] font-medium text-gray-500 hover:bg-gray-100'
            }
            onClick={() => handleGroupClick(group)}
          >
            {group}
          </button>
        ))}
      </div>
      <div className={'flex flex-wrap gap-1.75'}>
        {members.map(member => {
          const isSelected = selected.includes(member)
          return (
            <button
              key={member}
              type={'button'}
              aria-pressed={isSelected}
              className={cn(
                'cursor-pointer rounded-[20px] px-2.5 py-1 text-[14px] font-medium transition-colors',
                isSelected ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-100',
              )}
              onClick={() => toggleMember(member)}
            >
              {member}
            </button>
          )
        })}
      </div>
    </div>
  )
}
