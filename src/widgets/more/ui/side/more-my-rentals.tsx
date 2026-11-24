'use client'

import { useMyRentalHistoryHook } from '@/entities/equipment'
import { formatDateTime } from '@/shared/lib/format'
import { Text } from '@/shared/ui/override/text'

export const MoreMyRentals = () => {
  const { rentals, isPending } = useMyRentalHistoryHook()

  return (
    <div
      className={
        'scrollbar-hidden flex min-h-0 w-full flex-1 flex-col gap-3 overflow-y-auto px-5 pb-5 lg:w-[550px] lg:px-7.5'
      }
    >
      {isPending ? (
        <Text className={'text-subtle-foreground py-8 text-center text-[14px]'}>대여 내역을 불러오는 중입니다</Text>
      ) : rentals.length === 0 ? (
        <Text className={'text-subtle-foreground py-8 text-center text-[14px]'}>대여 내역이 없습니다</Text>
      ) : (
        rentals.map(rental => (
          <div key={rental.rentalId} className={'border-border flex flex-col gap-1.5 rounded-[14px] border p-4'}>
            <Text className={'text-[15px] font-bold'}>{rental.equipmentName}</Text>
            <Text className={'text-muted-foreground! text-[13px] font-medium'}>
              {formatDateTime(rental.startAt)} ~ {formatDateTime(rental.endAt)}
            </Text>
          </div>
        ))
      )}
    </div>
  )
}
