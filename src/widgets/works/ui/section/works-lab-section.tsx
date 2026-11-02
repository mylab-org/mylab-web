'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useUsersMeHook } from '@/entities/user'
import { WorksLabCard } from '@/entities/works'
import { getWorksAllList } from '@/entities/works/api/get-works-all-list'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { cn } from '@/shared/lib'
import { Avatar } from '@/shared/ui/override/avatar'
import { Text } from '@/shared/ui/override/text'

type WorksLabSectionProps = {
  variant?: 'pc' | 'mobile'
}

export const WorksLabSection = ({ variant = 'pc' }: WorksLabSectionProps) => {
  const isMobile = variant === 'mobile'
  const { me } = useUsersMeHook()
  const labId = me?.lab?.labId
  const [openUserIds, setOpenUserIds] = useState<Record<number, boolean>>({})
  const [initialized, setInitialized] = useState(false)

  const { data: members, isPending } = useQuery({
    queryKey: QUERY_KEYS.TASK.WORKS_ALL_LIST(labId ?? 0),
    queryFn: () => getWorksAllList(labId ?? 0),
    enabled: labId !== undefined,
  })

  useEffect(() => {
    if (!members || initialized) return

    const firstWithWork = members.find(member => member.papers.length > 0 || member.tasks.length > 0)
    if (firstWithWork) {
      setOpenUserIds({ [firstWithWork.userId]: true })
    }
    setInitialized(true)
  }, [members, initialized])

  const toggleMember = (userId: number) => {
    setOpenUserIds(prev => ({ ...prev, [userId]: !prev[userId] }))
  }

  if (isPending) {
    return <Text className={'py-8 text-center text-[14px] text-gray-400!'}>연구실 업무를 불러오는 중...</Text>
  }

  if (!members?.length) {
    return (
      <div
        className={'flex flex-col items-center gap-2 rounded-[16px] border border-dashed border-gray-200 px-4 py-10'}
      >
        <Text className={'text-[14px] font-medium text-gray-400!'}>표시할 연구실 멤버가 없습니다.</Text>
      </div>
    )
  }

  return (
    <section className={'flex flex-col gap-3'}>
      {members.map(member => {
        const isOpen = !!openUserIds[member.userId]
        const workCount = member.papers.length + member.tasks.length

        return (
          <div key={member.userId} className={'overflow-hidden rounded-[16px] border border-gray-100 bg-white'}>
            <button
              type={'button'}
              className={'flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left md:px-4'}
              onClick={() => toggleMember(member.userId)}
            >
              <Avatar src={'/test.png'} alt={'profile'} width={24} height={24} imgClassName={'rounded-full'}>
                <div className={'flex min-w-0 flex-col'}>
                  <Text className={'text-[15px] font-semibold md:text-[18px]'}>{member.name}</Text>
                  <Text className={'text-[11px] font-medium text-gray-400! md:text-[12px]'}>
                    논문 {member.papers.length} · 업무 {member.tasks.length}
                  </Text>
                </div>
              </Avatar>
              <div className={'flex shrink-0 items-center gap-2'}>
                <span className={'rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-500'}>
                  {workCount}
                </span>
                <ChevronDown
                  className={cn(
                    'size-4 shrink-0 text-gray-400 transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                />
              </div>
            </button>

            {isOpen && (
              <div className={'max-h-[600px] overflow-y-auto border-t border-gray-100 px-3.5 py-3 md:px-4'}>
                {workCount === 0 ? (
                  <div className={'flex h-[88px] items-center justify-center'}>
                    <Text className={'text-[13px] font-medium text-gray-400 md:text-[14px]'}>
                      진행 중인 업무가 없습니다.
                    </Text>
                  </div>
                ) : isMobile ? (
                  <div className={'flex flex-col gap-3'}>
                    {member.papers.map(paper => (
                      <WorksLabCard
                        key={`paper-${paper.id}`}
                        paper={paper}
                        className={'w-full rounded-[12px] border border-[#e2e3e5] p-3.5 md:w-full'}
                      />
                    ))}
                    {member.tasks.map(task => (
                      <WorksLabCard
                        key={`task-${task.taskId}`}
                        task={task}
                        className={'w-full rounded-[12px] border border-[#e2e3e5] p-3.5 md:w-full'}
                      />
                    ))}
                  </div>
                ) : (
                  <div className={'grid min-w-0 grid-cols-[minmax(0,1fr)]'}>
                    <div className={'overflow-x-auto pb-2'}>
                      <div className={'flex w-max flex-row items-stretch gap-3'}>
                        {member.papers.map(paper => (
                          <WorksLabCard
                            key={`paper-${paper.id}`}
                            paper={paper}
                            className={'rounded-[12px] border border-[#e2e3e5] p-4'}
                          />
                        ))}
                        {member.tasks.map(task => (
                          <WorksLabCard
                            key={`task-${task.taskId}`}
                            task={task}
                            className={'rounded-[12px] border border-[#e2e3e5] p-4'}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </section>
  )
}
