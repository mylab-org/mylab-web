'use client'

import { useEquipmentRequestsHook } from '@/entities/equipment'
import type { EquipmentRequestStatusType } from '@/entities/equipment'
import { LabRequestItem } from '@/entities/labs'
import { Text } from '@/shared/ui/override/text'

interface SideStuRequestListProps {
  isBottom: boolean
  status?: EquipmentRequestStatusType
  emptyMessage?: string
}

export const SideStuRequestList = ({
  isBottom,
  status,
  emptyMessage = '신청 내역이 없습니다',
}: SideStuRequestListProps) => {
  const { requests, isPending } = useEquipmentRequestsHook(status)

  return (
    <div className={'flex min-h-0 flex-1 flex-col gap-3.75 border-t border-t-gray-300 pt-2.5'}>
      <div className={`flex flex-1 flex-col gap-3.75 ${isBottom ? 'overflow-hidden' : 'overflow-auto'}`}>
        {isPending ? (
          <Text className={'text-subtle-foreground py-8 text-center text-[14px]'}>신청 내역을 불러오는 중입니다</Text>
        ) : requests.length === 0 ? (
          <Text className={'text-subtle-foreground py-8 text-center text-[14px]'}>{emptyMessage}</Text>
        ) : (
          requests.map(request => <LabRequestItem key={request.requestId} request={request} />)
        )}
      </div>
    </div>
  )
}
