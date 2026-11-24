'use client'

import { useMyEquipmentRequestsHook } from '@/entities/equipment'
import type { EquipmentRequestStatusType } from '@/entities/equipment'
import { formatDateWithWeekday } from '@/shared/lib/format'
import { Text } from '@/shared/ui/override/text'

const STATUS_LABEL: Record<EquipmentRequestStatusType, { name: string; className: string }> = {
  PENDING: { name: '대기', className: 'bg-muted text-muted-foreground' },
  APPROVED: { name: '승인', className: 'bg-brand/10 text-brand' },
  REJECTED: { name: '반려', className: 'bg-error/10 text-error' },
}

export const MoreMyRequests = () => {
  const { requests, isPending } = useMyEquipmentRequestsHook()

  return (
    <div
      className={
        'scrollbar-hidden flex min-h-0 w-full flex-1 flex-col gap-3 overflow-y-auto px-5 pb-5 lg:w-[550px] lg:px-7.5'
      }
    >
      {isPending ? (
        <Text className={'text-subtle-foreground py-8 text-center text-[14px]'}>신청 내역을 불러오는 중입니다</Text>
      ) : requests.length === 0 ? (
        <Text className={'text-subtle-foreground py-8 text-center text-[14px]'}>신청 내역이 없습니다</Text>
      ) : (
        requests.map(request => {
          const status = STATUS_LABEL[request.status]

          return (
            <div key={request.requestId} className={'border-border flex flex-col gap-1.5 rounded-[14px] border p-4'}>
              <div className={'flex items-start justify-between gap-2'}>
                <Text className={'text-[15px] font-bold'}>{request.name}</Text>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${status.className}`}>
                  {status.name}
                </span>
              </div>
              <Text className={'text-[13px] font-semibold'}>
                {request.price.toLocaleString()}원, {request.quantity}개
              </Text>
              <Text className={'text-subtle-foreground! text-[12px] font-medium'}>
                {formatDateWithWeekday(request.createdAt)}
              </Text>
            </div>
          )
        })
      )}
    </div>
  )
}
