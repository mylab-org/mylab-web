'use client'

import { useEquipmentListHook } from '@/entities/equipment'
import { LabManagementItem } from '@/entities/labs'
import { Button } from '@/shared/ui/override/button'
import { CheckBox } from '@/shared/ui/override/checkbox'
import { Text } from '@/shared/ui/override/text'

export const SideManagenemtList = ({ isBottom }: { isBottom: boolean }) => {
  const { equipments, isPending } = useEquipmentListHook()

  return (
    <div className={'flex min-h-0 flex-col gap-3.75 border-t border-t-gray-300 pt-2.5'}>
      <div className={'flex items-center justify-between'}>
        <CheckBox title="전체" />
        <Button.Menu className="font-bold">삭제</Button.Menu>
      </div>
      <div className={`flex flex-1 flex-col gap-3.75 ${isBottom ? 'overflow-hidden' : 'overflow-auto'}`}>
        {isPending ? (
          <Text className={'text-subtle-foreground py-8 text-center text-[14px]'}>비품을 불러오는 중입니다</Text>
        ) : equipments.length === 0 ? (
          <Text className={'text-subtle-foreground py-8 text-center text-[14px]'}>등록된 비품이 없습니다</Text>
        ) : (
          equipments.map(equipment => <LabManagementItem key={equipment.equipmentId} equipment={equipment} />)
        )}
      </div>
    </div>
  )
}
