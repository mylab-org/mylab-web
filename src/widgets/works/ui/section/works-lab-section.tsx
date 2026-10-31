'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useUsersMeHook } from '@/entities/user'
import { WorksLabCard } from '@/entities/works'
import { getWorksAllList } from '@/entities/works/api/get-works-all-list'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { cn } from '@/shared/lib'
import { Avatar } from '@/shared/ui/override/avatar'
import { Text } from '@/shared/ui/override/text'

export const WorksLabSection = () => {
  const { me } = useUsersMeHook()
  const labId = me?.lab?.labId
  const [openUserIds, setOpenUserIds] = useState<Record<number, boolean>>({})

  const { data: members } = useQuery({
    queryKey: QUERY_KEYS.TASK.WORKS_ALL_LIST(labId ?? 0),
    queryFn: () => getWorksAllList(labId ?? 0),
    enabled: labId !== undefined,
  })

  const toggleMember = (userId: number) => {
    setOpenUserIds(prev => ({ ...prev, [userId]: !prev[userId] }))
  }

  return (
    <section className={'space-y-2.5 p-2.5'}>
      {members?.map(member => {
        const isOpen = !!openUserIds[member.userId]

        return (
          <div key={member.userId} className={'w-full min-w-0 space-y-4 border-b border-gray-200 py-2.5'}>
            <div
              className={'flex cursor-pointer items-center justify-between'}
              onClick={() => toggleMember(member.userId)}
            >
              <Avatar src={'/test.png'} alt={'profile'} width={24} height={24} imgClassName={'rounded-full'}>
                <Text className={'text-[16px] font-semibold md:text-[20px]'}>{member.name}</Text>
              </Avatar>
              <ChevronDown
                className={cn('size-4 shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
              />
            </div>
            {isOpen &&
              (member.papers.length === 0 && member.tasks.length === 0 ? (
                <div className={'flex h-[100px] items-center justify-center'}>
                  <Text className={'text-[14px] font-medium text-gray-400 md:text-[16px]'}>
                    진행 중인 업무가 없습니다.
                  </Text>
                </div>
              ) : (
                // grid + minmax(0,1fr): flex 조상이 콘텐츠만큼 늘어나도 스크롤 영역 너비를 부모에 고정
                <div className={'grid min-w-0 grid-cols-[minmax(0,1fr)]'}>
                  <div className={'overflow-x-auto pb-4'}>
                    <div className={'flex w-max flex-row items-stretch gap-4'}>
                      {member.papers.map(paper => (
                        <WorksLabCard key={`paper-${paper.id}`} paper={paper} />
                      ))}
                      {member.tasks.map(task => (
                        <WorksLabCard key={`task-${task.taskId}`} task={task} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )
      })}
    </section>
  )
}
