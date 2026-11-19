'use client'

import { useEquipmentRequestsHook } from '@/entities/equipment'
import { LabRequestItem } from '@/entities/labs'
import { Button } from '@/shared/ui/override/button'
import { CheckBox } from '@/shared/ui/override/checkbox'
import { Text } from '@/shared/ui/override/text'

export const SideRequestList = ({ isBottom }: { isBottom: boolean }) => {
  const { requests, isPending } = useEquipmentRequestsHook('PENDING')

  return (
    <div className={'flex min-h-0 flex-col gap-3.75 border-t border-t-gray-300 pt-2.5'}>
      <div className={'flex items-center justify-between'}>
        <CheckBox title="전체" />
        <div className={'flex items-center gap-5'}>
          <Button.Menu className="font-bold">승인</Button.Menu>
          <Button.Menu className="font-bold">반려</Button.Menu>
        </div>
      </div>
      <div className={`flex flex-col gap-3.75 ${isBottom ? 'overflow-hidden' : 'overflow-auto'}`}>
        {isPending ? (
          <Text className={'text-subtle-foreground py-8 text-center text-[14px]'}>신청 내역을 불러오는 중입니다</Text>
        ) : requests.length === 0 ? (
          <Text className={'text-subtle-foreground py-8 text-center text-[14px]'}>대기 중인 신청이 없습니다</Text>
        ) : (
          requests.map(request => <LabRequestItem key={request.requestId} request={request} isCheck />)
        )}
      </div>
    </div>
  )
}
