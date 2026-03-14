'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Text } from '@/shared/ui/text'

interface MeetEtcCardProps {
  id: string
  type: 'MEET' | 'PERSONAL'
}

export const MeetEtcCard = ({ id, type }: MeetEtcCardProps) => {
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
      className={`${isDragging ? 'relative z-0' : 'relative z-10'} flex w-[250px] shrink-0 flex-col items-center gap-[10px] rounded-[12px] border-3 bg-white p-[10px] shadow-lg md:w-full md:gap-[20px] md:p-[20px] ${type === 'MEET' ? 'border-red-500' : 'border-violet-500'}`}
    >
      <div className={'flex w-full flex-col gap-[5px]'}>
        {/*<Tag.WorkType type={type} />*/}
        <h5 className={'font-pretendard text-[14px] font-semibold md:text-[18px]'}>
          주어진 오토인코더 논문 리뷰 PPT 제작
        </h5>
      </div>
      <div className={'flex w-full flex-col gap-[5px]'}>
        <Text className={'text-[12px] font-normal md:text-[16px]'}>26.02.04(수) ~ 26.02.06(금)</Text>
        <Text className={'text-[12px] font-normal md:text-[16px]'}>설명</Text>
      </div>
    </div>
  )
}
