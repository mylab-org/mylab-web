import { LabNotDataUI } from './lab-not-data-ui'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'
import type { LabInfoResponseType } from '../model/types'

type Props = {
  className?: string
  isShadow?: boolean
  labInfo: LabInfoResponseType
}

export const LabInfo = ({ className, isShadow = false, labInfo }: Props) => {
  return (
    <div className={cn('bg-card flex flex-col gap-3 rounded-[20px]', isShadow && CARD_SHADOW, className)}>
      <h3 className={'text-brand text-[18px] leading-7 font-bold md:text-[20px]'}>{labInfo.labName}</h3>
      {labInfo.hashtags.length === 0 ? (
        <LabNotDataUI>등록된 해시태그가 없습니다</LabNotDataUI>
      ) : (
        <div className={'flex flex-wrap gap-1.5'}>
          {labInfo.hashtags.map(tag => (
            <Tag.Lab key={tag}>{tag}</Tag.Lab>
          ))}
        </div>
      )}
      {labInfo.description === null || labInfo.description.trim() === '' ? (
        <LabNotDataUI>등록된 연구실 소개가 없습니다</LabNotDataUI>
      ) : (
        <div className={'bg-muted w-full rounded-[12px] px-2.5 py-2'}>
          <Text className={'text-[12px] font-medium md:text-[14px]'}>{labInfo.description}</Text>
        </div>
      )}
    </div>
  )
}
