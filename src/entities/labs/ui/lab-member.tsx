import { LabMemberItem } from '@/entities/labs'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { Text } from '@/shared/ui/override/text'
import type { LabsMembersResponseType } from '../model/types'

interface LabMemberProps {
  members: LabsMembersResponseType[]
  onViewAll?: () => void
  showViewAll?: boolean
}

export const LabMember = ({ members, onViewAll, showViewAll = false }: LabMemberProps) => {
  return (
    <div className={cn('bg-card flex flex-col gap-3 rounded-[20px] p-5', CARD_SHADOW)}>
      <div className={'flex items-center justify-between gap-2'}>
        <h3 className={'text-[18px] leading-7 font-bold md:text-[20px]'}>연구원</h3>
        {showViewAll && onViewAll && (
          <button type={'button'} onClick={onViewAll}>
            <Text className={'text-brand! text-[12px] font-medium'}>전체 보기</Text>
          </button>
        )}
      </div>
      <div className={'flex flex-col gap-3'}>
        {members.map(member => (
          <LabMemberItem key={member.name} user={member} />
        ))}
      </div>
    </div>
  )
}
