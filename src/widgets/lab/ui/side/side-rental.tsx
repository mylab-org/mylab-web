'use client'

import { Image } from 'next/dist/client/image-component'
import { useState } from 'react'

import { useEquipmentListHook, useMyRentalsHook } from '@/entities/equipment'
import { LabRentalItem } from '@/entities/labs'
import { SideRentalTime } from '@/features/lab-side-modal'
import { Button } from '@/shared/ui/override/button'
import { Text } from '@/shared/ui/override/text'
import { SideBottomWrapper } from '@/shared/ui/template/side-bottom-wrapper'

const HOUR_MS = 60 * 60 * 1000

const padTwo = (value: number) => String(value).padStart(2, '0')

const formatTime = (value: string) => {
  const date = new Date(value)

  return `${padTwo(date.getHours())}:${padTwo(date.getMinutes())}`
}

export const SideRental = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { equipments, isPending } = useEquipmentListHook()
  const { rentals } = useMyRentalsHook()

  const [myRental] = rentals
  const usedHours = myRental
    ? Math.round((new Date(myRental.endAt).getTime() - new Date(myRental.startAt).getTime()) / HOUR_MS)
    : 0

  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 px-5 lg:w-[750px] lg:px-7.5'}>
      <div className={'flex min-h-0 flex-1 flex-col gap-3.75'}>
        <div className={'border-border flex items-center gap-5 rounded-[12px] border px-5 py-2.5 lg:py-3.75'}>
          <Image src={'icon/icon_main_time.svg'} alt={''} width={24} height={24} className={'h-4 w-4 lg:h-6 lg:w-6'} />
          <div className={'flex flex-1 flex-col gap-1'}>
            {myRental ? (
              <>
                <Text className={'text-[14px] font-semibold lg:text-[24px]'}>
                  {myRental.equipmentName} {formatTime(myRental.startAt)} ~ {formatTime(myRental.endAt)}
                </Text>
                <Text className={'text-muted-foreground! text-[10px] font-medium lg:text-[16px]'}>
                  총 {usedHours}시간 이용
                </Text>
              </>
            ) : (
              <Text className={'text-muted-foreground! text-[14px] font-medium lg:text-[18px]'}>
                대여 중인 비품이 없습니다
              </Text>
            )}
          </div>
        </div>
        <div className={`flex flex-1 flex-col gap-3.75 ${isOpen ? 'overflow-hidden' : 'overflow-auto'}`}>
          {isPending ? (
            <Text className={'text-subtle-foreground py-8 text-center text-[14px]'}>비품을 불러오는 중입니다</Text>
          ) : equipments.length === 0 ? (
            <Text className={'text-subtle-foreground py-8 text-center text-[14px]'}>등록된 비품이 없습니다</Text>
          ) : (
            equipments.map(equipment => <LabRentalItem key={equipment.equipmentId} equipment={equipment} />)
          )}
        </div>
      </div>
      <Button className={'mb-5'} onClick={() => setIsOpen(true)}>
        대여 시간 변경하기
      </Button>
      <SideBottomWrapper isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SideRentalTime />
      </SideBottomWrapper>
    </div>
  )
}
