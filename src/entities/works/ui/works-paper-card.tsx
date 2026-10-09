'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useSideModalStore } from '@/shared/store'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'

interface Props {
  id: string
  isDeadLine?: boolean
  isEnd?: boolean
  detailComponent: () => React.JSX.Element
}

export const WorksPaperCard = ({ id, isDeadLine = false, isEnd = false, detailComponent }: Props) => {
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
      className={`${isDragging ? 'relative z-0' : 'relative z-10'} flex cursor-pointer flex-col items-center gap-5 rounded-[12px] p-2.5 shadow-lg md:min-h-[165px] md:p-5 ${isEnd ? 'bg-gray-200' : 'bg-white'} ${isDeadLine && 'border-error border-3'}`}
      onClick={() => openSideModal(detailComponent, '논문 제목')}
    >
      <div className={'flex w-full flex-col gap-1.25'}>
        <h5 className={'text-[14px] font-bold md:text-[18px]'}>논문 제목</h5>
        <div className={'flex flex-col gap-1.25'}>
          <Text className={'text-[10px] font-normal md:text-[14px]'}>
            2026.02.04(수) ~ 2026.02.06(금), <b className={`font-bold ${isDeadLine && 'text-error'}`}>마감 D-27</b>
          </Text>
          <div>
            <Text className={'text-[10px] font-normal md:text-[14px]'}>2025 한국통신학회 동계종합학술발표회</Text>
            <Text className={'text-[10px] font-normal md:text-[14px]'}>모나 용평(용평리조트)</Text>
          </div>
        </div>
      </div>
      <div className={'flex w-full flex-wrap gap-2.5'}>
        <Tag.Member name={'홍길동'} />
      </div>
    </div>
  )
}
