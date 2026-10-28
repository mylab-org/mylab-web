import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { WorkPaperDetail } from './side/works-paper-detail'
import { WorksPaperCard, WorksEmptyCard, WorksTaskCard } from '@/entities/works'
import { WorksMoreMenu } from '@/features/works'
import { deleteWorksTask } from '@/features/works/api/delete-works-task'
import { QUERY_KEYS } from '@/shared/api/query-key'

export const WorksDragContainer = ({ id, items, isDragging, isConference = false, onEditTask, children }: any) => {
  const { setNodeRef } = useDroppable({ id })

  return (
    <section className="relative z-20 flex w-full shrink-0 flex-col gap-2.5 md:w-[373px] md:gap-7.5">
      {children}
      <SortableContext id={id} items={items.map((i: any) => i.id)} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={`touch-action-pan-x flex min-h-[150px] flex-1 flex-row items-center gap-2.5 overflow-x-auto rounded-[12px] transition-colors duration-300 md:min-h-[500px] md:flex-col md:overflow-x-visible ${
            isDragging
              ? 'border-2 border-dashed border-white/40 bg-white/5'
              : 'border-2 border-transparent bg-transparent'
          } `}
        >
          {items.map((item: any) => (
            /* [중요] 가로 배열 시 아이템이 부모 너비에 맞춰 줄어들지 않도록 고정 너비 부여 */
            <div key={item.id} className="shrink-0 md:w-full md:shrink">
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

          {items.length === 0 && !isDragging && <WorksEmptyCard />}
        </div>
      </SortableContext>
    </section>
  )
}
