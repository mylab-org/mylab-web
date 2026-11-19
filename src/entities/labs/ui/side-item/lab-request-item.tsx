import type { EquipmentRequestResponseType } from '@/entities/equipment'
import { formatDateWithWeekday } from '@/shared/lib/format'
import { Avatar } from '@/shared/ui/override/avatar'
import { Text } from '@/shared/ui/override/text'

interface LabRequestItemProps {
  request: EquipmentRequestResponseType
  isCheck?: boolean
  checked?: boolean
  onCheck?: (requestId: number) => void
}

export const LabRequestItem = ({ request, isCheck = false, checked = false, onCheck }: LabRequestItemProps) => {
  const { requestId, name, price, quantity, purchaseLink, requesterName, createdAt } = request

  return (
    <div className={'flex items-start gap-2.5 py-2.5'}>
      {isCheck && <input type="checkbox" checked={checked} onChange={() => onCheck?.(requestId)} />}
      <div className={'flex min-w-0 flex-1 flex-col gap-1.25'}>
        <div className={'flex items-start justify-between'}>
          <Text className={'text-[14px] font-medium lg:text-[18px]'}>{name}</Text>
          <Text className={'text-[14px] font-bold lg:text-[18px]'}>{quantity}개</Text>
        </div>
        <Text className={'text-[14px] font-bold lg:text-[18px]'}>{price.toLocaleString()} 원</Text>
        {purchaseLink && (
          <Avatar src={'/icon/link.svg'} alt={'link'} width={16} height={16}>
            <Text className={'text-muted-foreground min-w-0 truncate text-[12px] font-normal lg:text-[14px]'}>
              {purchaseLink}
            </Text>
          </Avatar>
        )}
        <div className={'flex items-center justify-between text-[10px] lg:text-[14px]'}>
          <Text className={'text-subtle-foreground'}>{formatDateWithWeekday(createdAt)}</Text>
          <Text className={'text-subtle-text'}>{requesterName}</Text>
        </div>
      </div>
    </div>
  )
}
