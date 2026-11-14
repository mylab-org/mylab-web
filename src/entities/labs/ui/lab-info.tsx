import { LabNotDataUI } from './lab-not-data-ui'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'
import type { LabsDetailResponseType } from '../model/types'

interface LabIntroProps {
  lab?: LabsDetailResponseType
  className?: string
  isShadow?: boolean
}

export const LabInfo = ({ lab, className, isShadow = false }: LabIntroProps) => {
  if (!lab) return null

  return (
    <div className={cn('bg-card flex flex-col gap-3 rounded-[20px]', isShadow && CARD_SHADOW, className)}>
      <h3 className={'text-brand text-[18px] leading-7 font-bold md:text-[20px]'}>{lab.labName}</h3>
      {lab.researchFields.length === 0 ? (
        <LabNotDataUI>등록된 연구 분야가 없습니다</LabNotDataUI>
      ) : (
        <div className={'flex flex-wrap gap-1.5'}>
          {lab.researchFields.map(field => (
            <Tag.Lab key={field}>{field}</Tag.Lab>
          ))}
        </div>
      )}
      {lab.description === null || lab.description.trim() === '' ? (
        <LabNotDataUI>등록된 연구실 소개가 없습니다</LabNotDataUI>
      ) : (
        <div className={'bg-muted w-full rounded-[12px] px-2.5 py-2'}>
          <Text className={'text-[12px] font-medium md:text-[14px]'}>{lab.description}</Text>
        </div>
      )}
    </div>
  )
}
