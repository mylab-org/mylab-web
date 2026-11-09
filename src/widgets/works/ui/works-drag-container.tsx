import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { WorkPaperDetail } from './side/works-paper-detail'
import { WorksPaperCard, WorksTaskCard } from '@/entities/works'
import { WorksMoreMenu } from '@/features/works'
import { deleteWorksTask } from '@/features/works/api/delete-works-task'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { cn } from '@/shared/lib'
import { Text } from '@/shared/ui/override/text'

type WorksDragContainerProps = {
  id: string
  items: any[]
  isDragging: boolean
  isConference?: boolean
  onEditTask?: (task: any) => void
  onCreate?: () => void
  createLabel?: string
  variant?: 'pc' | 'mobile'
  children?: React.ReactNode
}

export const WorksDragContainer = ({
  id,
  items,
  isDragging,
  isConference = false,
  onEditTask,
  onCreate,
  createLabel = '만들기',
  variant = 'pc',
  children,
}: WorksDragContainerProps) => {
  const { setNodeRef } = useDroppable({ id })
  const isMobile = variant === 'mobile'

  return (
    <section
      className={cn(
        'relative z-20 flex w-full shrink-0 flex-col gap-3',
        !isMobile && 'md:w-[300px] md:gap-4 lg:w-[320px]',
      )}
    >
      {children}
      <SortableContext id={id} items={items.map((i: any) => i.id)} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={cn(
            'flex flex-1 flex-col gap-3 rounded-[16px] transition-colors duration-300',
            isMobile ? 'min-h-[180px]' : 'min-h-[150px] md:min-h-[480px]',
            isDragging
              ? 'border-brand/40 bg-brand/5 border-2 border-dashed'
              : 'bg-muted/80 border border-transparent p-2.5 md:p-3',
          )}
        >
          {items.map((item: any) => (
            <div key={item.id} className={'w-full'}>
              {isConference ? (
                <WorksPaperCard paper={item} detailComponent={() => <WorkPaperDetail paperId={item.id} />} />
              ) : (
                <WorksTaskCard
                  task={item}
                  moreMenu={
                    onEditTask ? (
                      <div onPointerDown={e => e.stopPropagation()} onClick={e => e.stopPropagation()}>
                        <WorksMoreMenu
                          onEdit={() => onEditTask(item)}
                          deleteConfig={{
                            mutationFn: () => deleteWorksTask(item.taskId),
                            confirmMessage: '정말 업무를 삭제하시겠습니까?',
                            successMessage: '업무가 삭제되었습니다.',
                            defaultErrorMessage: '업무 삭제에 실패했습니다.',
                            invalidateQueryKeys: [QUERY_KEYS.TASK.LIST],
                          }}
                        />
                      </div>
                    ) : undefined
                  }
                />
              )}
            </div>
          ))}

          {items.length === 0 && !isDragging && (
            <div
              className={
                'border-border bg-card flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-[12px] border border-dashed px-4 py-6'
              }
            >
              <Text className={'text-subtle-foreground text-center text-[13px] font-medium md:text-[15px]'}>
                {onCreate ? '아직 항목이 없습니다.' : '아이템을 이곳으로 드래그할 수 있어요'}
              </Text>
              {onCreate && (
                <button
                  type={'button'}
                  onClick={onCreate}
                  className={'bg-brand rounded-[10px] px-3.5 py-2 text-[13px] font-semibold text-white'}
                >
                  {createLabel}
                </button>
              )}
            </div>
          )}
        </div>
      </SortableContext>
    </section>
  )
}
