import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { ConferenceCard, MeetEtcCard } from '@/entities/works'
import { WorkEmptyCard } from '@/widgets/works/ui/work-Empty-card'

export const Container = ({ id, items, isDragging, isConference = false, children }: any) => {
  const { setNodeRef } = useDroppable({ id })

  return (
    <section className="relative z-20 flex w-full flex-shrink-0 flex-col gap-[10px] md:w-[373px] md:gap-[30px]">
      {children}
      <SortableContext id={id} items={items.map((i: any) => i.id)} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={`touch-action-pan-x flex min-h-[150px] flex-1 flex-row items-center gap-[10px] overflow-x-auto rounded-[12px] transition-colors duration-300 md:min-h-[500px] md:flex-col md:overflow-x-visible ${
            isDragging
              ? 'border-2 border-dashed border-white/40 bg-white/5'
              : 'border-2 border-transparent bg-transparent'
          } `}
        >
          {items.map((item: any) => (
            /* [중요] 가로 배열 시 아이템이 부모 너비에 맞춰 줄어들지 않도록 고정 너비 부여 */
            <div key={item.id} className="flex-shrink-0 md:w-full md:flex-shrink-1">
              {isConference ? (
                <ConferenceCard id={item.id} isDeadLine />
              ) : (
                <MeetEtcCard id={item.id} type={item.type} />
              )}
            </div>
          ))}

          {items.length === 0 && !isDragging && <WorkEmptyCard />}
        </div>
      </SortableContext>
    </section>
  )
}
