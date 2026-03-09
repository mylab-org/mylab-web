import { useSideModalStore } from '@/shared/store'
import { Tag, Text } from '@/shared/ui'
import { WorkConferenceDetail } from '@/widgets/work-side-content'

interface ConferenceCardProps {
  isDeadLine?: boolean
  isEnd?: boolean
}

export const ConferenceCard = ({ isDeadLine = false, isEnd = false }: ConferenceCardProps) => {
  const openSideModal = useSideModalStore(state => state.openSideModal)

  return (
    <div
      className={`flex min-h-[165px] cursor-pointer flex-col items-center gap-[20px] rounded-[12px] p-[20px] shadow-lg ${isEnd ? 'bg-gray-200' : 'bg-white'} ${isDeadLine && 'border-error border-3'}`}
      onClick={() => openSideModal(WorkConferenceDetail, '2026 한국통신학회 추계종합학술발표회')}
    >
      <div className={'flex w-full flex-col gap-[5px]'}>
        <h5 className={'font-pretendard text-[20px] font-bold'}>2026 한국통신학회 추계종합학술발표회</h5>
        <div className={'flex flex-col'}>
          <Text className={'text-[16px] font-normal'}>
            26.02.04(수) ~ 26.02.06(금), <b className={`font-bold ${isDeadLine && 'text-error'}`}>마감 D-27</b>
          </Text>
          <Text className={'text-[16px] font-normal'}>모나 용평(용평리조트)</Text>
        </div>
      </div>
      <div className={'flex w-full flex-wrap gap-[10px]'}>
        <Tag.Member name={'홍길동'} />
      </div>
    </div>
  )
}
