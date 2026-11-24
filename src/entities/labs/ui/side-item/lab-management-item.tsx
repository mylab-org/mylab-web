'use client'

import type { EquipmentResponseType } from '@/entities/equipment'
import { Switch } from '@/shared/ui/override/switch'
import { Text } from '@/shared/ui/override/text'

interface LabManagementItemProps {
  equipment: EquipmentResponseType
  checked?: boolean
  onCheck?: (equipmentId: number) => void
  onToggleRentable?: (equipment: EquipmentResponseType) => void
}

export const LabManagementItem = ({
  equipment,
  checked = false,
  onCheck,
  onToggleRentable,
}: LabManagementItemProps) => {
  const { equipmentId, name, imageUrl, isRentable } = equipment

  return (
    <div className={'flex items-start gap-2.5 py-2.5'}>
      <input type="checkbox" checked={checked} onChange={() => onCheck?.(equipmentId)} />
      <div className={'flex flex-1 gap-2.5'}>
        <div className={'bg-muted h-[70px] w-[70px] shrink-0 overflow-hidden rounded-[10px] lg:h-[100px] lg:w-[100px]'}>
          {/* 비품 이미지는 임의 외부 URL 이라 next/image 대신 img 사용 */}
          {imageUrl && <img src={imageUrl} alt={name} className={'h-full w-full object-cover'} />}
        </div>
        <div className={'flex flex-1 items-start justify-between px-2.5'}>
          <Text className={'text-[14px] font-bold lg:text-[24px]'}>{name}</Text>
          <Switch
            className={'py-0'}
            isSwitch={isRentable}
            onSwitch={() => onToggleRentable?.(equipment)}
            title={<Text className={'text-muted-foreground text-[10px] font-bold lg:text-[16px]'}>대여 활성화</Text>}
          />
        </div>
      </div>
    </div>
  )
}
