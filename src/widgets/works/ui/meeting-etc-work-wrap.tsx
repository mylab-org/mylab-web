// import { Image } from 'next/dist/client/image-component'
// import { useSideModalStore } from '@/shared/store'
// import { WorkCreateContent } from '@/widgets/work-side-content'
// import { WorkEmptyCard } from '@/widgets/works/ui/work-Empty-card'
// import { MeetEtcCard } from '@/entities/works'
//
// export const MeetingEtcWorkWrap = () => {
//   const openSideModal = useSideModalStore(state => state.openSideModal)
//   return (
//     <section className={'flex flex-1 gap-[30px] p-[10px]'}>
//       <section className={'flex w-[373] flex-col gap-[30px]'}>
//         <div className={'flex items-center justify-between'}>
//           <h4 className={'font-pretendard text-[22px] font-bold'}>시작 전</h4>
//           <Image
//             src={'icon/icon_main_add.svg'}
//             alt={''}
//             width={30}
//             height={30}
//             className={'cursor-pointer'}
//             onClick={() => openSideModal(WorkCreateContent, '업무 생성')}
//           />
//         </div>
//         <div className={'flex flex-1 flex-col gap-[10px]'}>
//           <WorkEmptyCard />
//         </div>
//       </section>
//       <section className={'flex w-[373] flex-col gap-[30px]'}>
//         <div className={'flex items-center justify-between'}>
//           <h4 className={'font-pretendard text-[22px] font-bold'}>진행 중</h4>
//           <Image
//             src={'icon/icon_main_add.svg'}
//             alt={''}
//             width={30}
//             height={30}
//             className={'cursor-pointer'}
//             onClick={() => openSideModal(WorkCreateContent, '업무 생성')}
//           />
//         </div>
//         <div className={'flex flex-1 flex-col gap-[10px]'}>
//           <MeetEtcCard type={'MEET'} />
//           <MeetEtcCard type={'PERSONAL'} />
//         </div>
//       </section>
//       <section className={'flex w-[373] flex-col gap-[30px]'}>
//         <h4 className={'font-pretendard text-[22px] font-bold'}>완료</h4>
//         <div className={'flex flex-1 flex-col gap-[10px]'}>
//           <WorkEmptyCard />
//         </div>
//       </section>
//     </section>
//   )
// }
'use client'

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { Image } from 'next/dist/client/image-component'
import { useState } from 'react'
import { MeetEtcCard } from '@/entities/works'
import { useSideModalStore } from '@/shared/store'
import { WorkCreateContent } from '@/widgets/work-side-content'
import { WorkEmptyCard } from '@/widgets/works/ui/work-Empty-card'
import type { DropResult } from '@hello-pangea/dnd'

// 1. 초기 데이터 구조 정의
const initialData = {
  todo: [{ id: '1', title: '업무 1', type: 'MEET' }],
  doing: [{ id: '2', title: '업무 2', type: 'PERSONAL' }],
  done: [],
}

type ColumnType = keyof typeof initialData

export const MeetingEtcWorkWrap = () => {
  const [data, setData] = useState(initialData)
  const openSideModal = useSideModalStore(state => state.openSideModal)

  // 2. 드래그 종료 시 실행되는 로직
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    // 영역 밖으로 던졌거나 제자리에 둔 경우
    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    const sourceCol = source.droppableId as ColumnType
    const destCol = destination.droppableId as ColumnType

    const sourceItems = [...data[sourceCol]]
    const destItems = sourceCol === destCol ? sourceItems : [...data[destCol]]

    // 아이템 이동
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
      <section className={'flex flex-1 gap-[30px] overflow-x-auto p-[10px]'}>
        {/* 각 컬럼 렌더링 */}
        {Object.entries(data).map(([columnId, items]) => (
          <section key={columnId} className={'flex w-[373px] flex-col gap-[30px]'}>
            <div className={'flex items-center justify-between'}>
              <h4 className={'font-pretendard text-[22px] font-bold uppercase'}>
                {columnId === 'todo' ? '시작 전' : columnId === 'doing' ? '진행 중' : '완료'}
              </h4>
              {columnId !== 'done' && (
                <Image
                  src={'icon/icon_main_add.svg'}
                  alt={'add'}
                  width={30}
                  height={30}
                  className={'cursor-pointer'}
                  onClick={() => openSideModal(WorkCreateContent, '업무 생성')}
                />
              )}
            </div>

            {/* 3. 드롭 가능한 영역 (Droppable) */}
            <Droppable droppableId={columnId}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`flex min-h-[200px] flex-1 flex-col gap-[10px] rounded-[12px] transition-colors ${
                    snapshot.isDraggingOver ? 'bg-gray-200' : ''
                  }`}
                >
                  {items.length > 0 ? (
                    items.map((item, index) => (
                      /* 4. 드래그 가능한 카드 (Draggable) */
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{ ...provided.draggableProps.style }}
                            className={snapshot.isDragging ? 'opacity-80' : ''}
                          >
                            <MeetEtcCard type={item.type as 'MEET' | 'PERSONAL'} />
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
