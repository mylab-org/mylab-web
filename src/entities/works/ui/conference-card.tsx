'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useSideModalStore } from '@/shared/store'
import { Tag, Text } from '@/shared/ui'
import { WorkConferenceDetail } from '@/widgets/work-side-content'

interface ConferenceCardProps {
  id: string
  isDeadLine?: boolean
  isEnd?: boolean
}

export const ConferenceCard = ({ id, isDeadLine = false, isEnd = false }: ConferenceCardProps) => {
  const openSideModal = useSideModalStore(state => state.openSideModal)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    // ⚠️ 드래그 중일 때 원본을 아예 없애지 말고 0.3 정도로 유지하거나,
    // Overlay가 보일 수 있도록 아주 낮은 투명도를 줍니다.
    opacity: isDragging ? 0.3 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${isDragging ? 'relative z-0' : 'relative z-10'} flex cursor-pointer flex-col items-center gap-[20px] rounded-[12px] p-[10px] shadow-lg md:min-h-[165px] md:p-[20px] ${isEnd ? 'bg-gray-200' : 'bg-white'} ${isDeadLine && 'border-error border-3'}`}
      onClick={() => openSideModal(WorkConferenceDetail, '2026 한국통신학회 추계종합학술발표회')}
    >
      <div className={'flex w-full flex-col gap-[5px]'}>
        <h5 className={'font-pretendard text-[16px] font-bold md:text-[20px]'}>2026 한국통신학회 추계종합학술발표회</h5>
        <div className={'flex flex-col'}>
          <Text className={'text-[12px] font-normal md:text-[16px]'}>
            26.02.04(수) ~ 26.02.06(금), <b className={`font-bold ${isDeadLine && 'text-error'}`}>마감 D-27</b>
          </Text>
          <Text className={'text-[12px] font-normal md:text-[16px]'}>모나 용평(용평리조트)</Text>
        </div>
      </div>
      <div className={'flex w-full flex-wrap gap-[10px]'}>
        <Tag.Member name={'홍길동'} />
      </div>
    </div>
  )
}
