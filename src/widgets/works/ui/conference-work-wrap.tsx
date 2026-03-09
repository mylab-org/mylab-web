// import { WorkEmptyCard } from '@/widgets/works/ui/work-Empty-card'
// import { ConferenceCard } from '@/entities/works'
//
// export const ConferenceWorkWrap = () => {
//   return (
//     <section className={'flex gap-[30px] p-[10px]'}>
//       <section className={'flex w-[373] flex-col gap-[30px]'}>
//         <h4 className={'font-pretendard text-[22px] font-bold'}>연구 준비</h4>
//         <div className={'flex flex-col gap-[10px]'}>
//           <WorkEmptyCard />
//         </div>
//       </section>
//       <section className={'flex w-[373] flex-col gap-[30px]'}>
//         <h4 className={'font-pretendard text-[22px] font-bold'}>실험 진행</h4>
//         <div className={'flex flex-col gap-[10px]'}>
//           <ConferenceCard isDeadLine />
//         </div>
//       </section>
//       <section className={'flex w-[373] flex-col gap-[30px]'}>
//         <h4 className={'font-pretendard text-[22px] font-bold'}>초안 작성</h4>
//         <div className={'flex flex-col gap-[10px]'}>
//           <WorkEmptyCard />
//         </div>
//       </section>
//       <section className={'flex w-[373] flex-col gap-[30px]'}>
//         <h4 className={'font-pretendard text-[22px] font-bold'}>교수 검토</h4>
//         <div className={'flex flex-col gap-[10px]'}>
//           <ConferenceCard isDeadLine />
//         </div>
//       </section>
//       <section className={'flex w-[373] flex-col gap-[30px]'}>
//         <h4 className={'font-pretendard text-[22px] font-bold'}>완료</h4>
//         <div className={'flex flex-col gap-[10px]'}>
//           <ConferenceCard isEnd />
//         </div>
//       </section>
//     </section>
//   )
// }
'use client'

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { useState } from 'react'
import { ConferenceCard } from '@/entities/works'
import { WorkEmptyCard } from '@/widgets/works/ui/work-Empty-card'
import type { DropResult } from '@hello-pangea/dnd'

// 1. 초기 데이터 구조 정의 (id는 고유해야 합니다)
const initialData = {
  READY: [{ id: 'conf-1', type: 'PREP' }], // 연구 준비
  PROGRESS: [{ id: 'conf-2', isDeadLine: true }], // 실험 진행
  DRAFT: [], // 초안 작성
  REVIEW: [{ id: 'conf-3', isDeadLine: true }], // 교수 검토
  DONE: [{ id: 'conf-4', isEnd: true }], // 완료
}

type ColumnType = keyof typeof initialData

export const ConferenceWorkWrap = () => {
  const [data, setData] = useState(initialData)

  // 2. 드래그 종료 핸들러
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    const sourceCol = source.droppableId as ColumnType
    const destCol = destination.droppableId as ColumnType

    const sourceItems = [...data[sourceCol]]
    const destItems = sourceCol === destCol ? sourceItems : [...data[destCol]]

    const [removed] = sourceItems.splice(source.index, 1)
    destItems.splice(destination.index, 0, removed)

    setData({
      ...data,
      [sourceCol]: sourceItems,
      [destCol]: destItems,
    })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className={'flex min-h-screen gap-[30px] overflow-x-auto p-[10px]'}>
        {Object.entries(data).map(([columnId, items]) => (
          <section key={columnId} className={'flex w-[373px] flex-col gap-[30px]'}>
            <h4 className={'font-pretendard text-[22px] font-bold'}>
              {columnId === 'READY' && '연구 준비'}
              {columnId === 'PROGRESS' && '실험 진행'}
              {columnId === 'DRAFT' && '초안 작성'}
              {columnId === 'REVIEW' && '교수 검토'}
              {columnId === 'DONE' && '완료'}
            </h4>

            {/* 3. 드롭 영역 정의 */}
            <Droppable droppableId={columnId}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`flex min-h-[300px] flex-1 flex-col gap-[10px] rounded-[12px] transition-colors ${
                    snapshot.isDraggingOver ? 'bg-gray-200' : ''
                  }`}
                >
                  {items.length > 0 ? (
                    items.map((item, index) => (
                      /* 4. 드래그 아이템 정의 */
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{ ...provided.draggableProps.style }}
                            className={snapshot.isDragging ? 'z-50' : ''}
                          >
                            <ConferenceCard isDeadLine={item.isDeadLine} isEnd={item.isEnd} />
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <WorkEmptyCard />
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </section>
        ))}
      </section>
    </DragDropContext>
  )
}
