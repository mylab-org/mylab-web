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
    return <Text className={'text-subtle-foreground! py-8 text-center text-[14px]'}>연구실 업무를 불러오는 중...</Text>
  }

  if (!members?.length) {
    return (
      <div className={'border-border flex flex-col items-center gap-2 rounded-[16px] border border-dashed px-4 py-10'}>
        <Text className={'text-subtle-foreground! text-[14px] font-medium'}>표시할 연구실 멤버가 없습니다.</Text>
      </div>
    )
  }

  return (
    <section className={'flex flex-col gap-3'}>
      {members.map(member => {
        const isOpen = !!openUserIds[member.userId]
        const workCount = member.papers.length + member.tasks.length

        return (
          <div key={member.userId} className={'border-border bg-card overflow-hidden rounded-[16px] border'}>
            <button
              type={'button'}
              className={'flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left md:px-4'}
              onClick={() => toggleMember(member.userId)}
            >
              <Avatar src={'/test.png'} alt={'profile'} width={24} height={24} imgClassName={'rounded-full'}>
                <div className={'flex min-w-0 flex-col'}>
                  <Text className={'text-[15px] font-semibold md:text-[18px]'}>{member.name}</Text>
                  <Text className={'text-subtle-foreground! text-[11px] font-medium md:text-[12px]'}>
                    논문 {member.papers.length} · 업무 {member.tasks.length}
                  </Text>
                </div>
              </Avatar>
              <div className={'flex shrink-0 items-center gap-2'}>
                <span className={'bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-[11px] font-semibold'}>
                  {workCount}
                </span>
                <ChevronDown
                  className={cn(
                    'text-subtle-foreground size-4 shrink-0 transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                />
              </div>
            </button>

            {isOpen && (
              <div className={'border-border max-h-[600px] overflow-y-auto border-t px-3.5 py-3 md:px-4'}>
                {workCount === 0 ? (
                  <div className={'flex h-[88px] items-center justify-center'}>
                    <Text className={'text-subtle-foreground text-[13px] font-medium md:text-[14px]'}>
                      진행 중인 업무가 없습니다.
                    </Text>
                  </div>
                ) : isMobile ? (
                  <div className={'flex flex-col gap-3'}>
                    {member.papers.map(paper => (
                      <WorksLabCard
                        key={`paper-${paper.id}`}
                        paper={paper}
                        className={'border-border w-full rounded-[12px] border p-3.5 md:w-full'}
                      />
                    ))}
                    {member.tasks.map(task => (
                      <WorksLabCard
                        key={`task-${task.taskId}`}
                        task={task}
                        className={'border-border w-full rounded-[12px] border p-3.5 md:w-full'}
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
                            className={'border-border rounded-[12px] border p-4'}
                          />
                        ))}
                        {member.tasks.map(task => (
                          <WorksLabCard
                            key={`task-${task.taskId}`}
                            task={task}
                            className={'border-border rounded-[12px] border p-4'}
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
