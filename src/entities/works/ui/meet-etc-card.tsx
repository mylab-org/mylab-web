import { useSideModalStore } from '@/shared/store'
import { Tag, Text } from '@/shared/ui'
import { WorkConferenceDetail } from '@/widgets/work-side-content'

interface MeetEtcCardProps {
  type: 'MEET' | 'PERSONAL'
}

export const MeetEtcCard = ({ type }: MeetEtcCardProps) => {
  return (
    <div
      className={`flex min-h-[165px] flex-col items-center gap-[20px] rounded-[12px] border-3 bg-white p-[20px] shadow-lg ${type === 'MEET' ? 'border-red-500' : 'border-violet-500'}`}
    >
      <div className={'flex w-full flex-col gap-[5px]'}>
        <Tag.WorkType type={type} />
        <h5 className={'font-pretendard text-[18px] font-semibold'}>주어진 오토인코더 논문 리뷰 PPT 제작</h5>
      </div>
      <div className={'flex w-full flex-col gap-[5px]'}>
        <Text className={'text-[16px] font-normal'}>26.02.04(수) ~ 26.02.06(금)</Text>
        <Text className={'text-[16px] font-normal'}>설명</Text>
      </div>
    </div>
  )
}
