'use client'

import { Image } from 'next/dist/client/image-component'
import { useState } from 'react'
import { LabRentalItem } from '@/entities/lab-side/ui/lab-rental-item'
import { SideRentalTime } from '@/features/lab-side-modal'
import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'
import { SideModalWrap } from '@/widgets/modal'

export const SideRental = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-[10px] px-[20px] lg:w-[750px] lg:px-[30px]'}>
      <div className={'flex min-h-0 flex-1 flex-col gap-[15px]'}>
        <div
          className={
            'flex items-center gap-[20px] rounded-[12px] border border-gray-300 px-[20px] py-[10px] lg:py-[15px]'
          }
        >
          <Image
            src={'icon/icon_main_time.svg'}
            alt={''}
            width={24}
            height={24}
            className={'h-[16px] w-[16px] lg:h-[24px] lg:w-[24px]'}
          />
          <div className={'flex flex-1 flex-col gap-[4px]'}>
            <Text className={'text-[14px] font-semibold lg:text-[24px]'}>오늘 01:50 ~ 09:00</Text>
            <Text className={'text-[10px] font-medium text-gray-400! lg:text-[16px]'}>총 18시간 이용</Text>
          </div>
        </div>
        <div className={`flex flex-1 flex-col gap-[15px] ${isOpen ? 'overflow-hidden' : 'overflow-auto'}`}>
          <LabRentalItem />
          <LabRentalItem />
          <LabRentalItem />
          <LabRentalItem />
          <LabRentalItem />
        </div>
      </div>
      <Button className={'mb-[20px]'} onClick={() => setIsOpen(true)}>
        대여 시간 변경하기
      </Button>
      <SideModalWrap isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SideRentalTime />
      </SideModalWrap>
    </div>
  )
}
