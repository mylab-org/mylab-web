import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'

interface LabIntroProps {
  className?: string
  isShadow?: boolean
}

export const LabInfo = ({ className, isShadow = false }: LabIntroProps) => {
  return (
    <div className={cn('flex flex-col gap-3 rounded-[20px] bg-white', isShadow && CARD_SHADOW, className)}>
      <h3 className={'text-[18px] leading-7 font-bold text-[#2562CD] md:text-[20px]'}>마이랩 연구실</h3>
      <div className={'flex flex-wrap gap-1.5'}>
        <Tag.Lab>무선 네트워크</Tag.Lab>
        <Tag.Lab>모바일 엣지/클라우드 컴퓨팅</Tag.Lab>
        <Tag.Lab>스마트 IoT</Tag.Lab>
        <Tag.Lab>차세대 모바일 이동통신 (5G/6G)</Tag.Lab>
        <Tag.Lab>지능형 미디어 통신</Tag.Lab>
      </div>
      <div className={'w-full rounded-[12px] bg-gray-100 px-2.5 py-2'}>
        <Text className={'text-[12px] font-medium md:text-[14px]'}>
          본 연구실은 광대역 지능형 통신 네트워크를 연구합니다.
        </Text>
      </div>
    </div>
  )
}
