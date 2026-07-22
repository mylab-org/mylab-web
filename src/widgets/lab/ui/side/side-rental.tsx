'use client'

import { Image } from 'next/dist/client/image-component'
import { useState } from 'react'
import { LabRentalItem } from '@/entities/lab'
import { SideRentalTime } from '@/features/lab-side-modal'
import { Button } from '@/shared/ui/override/button'
import { SideBottomWrapper } from '@/shared/ui/side-bottom-wrapper'
import { Text } from '@/shared/ui/text'

export const SideRental = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 px-5 lg:w-[750px] lg:px-7.5'}>
      <div className={'flex min-h-0 flex-1 flex-col gap-3.75'}>
        <div className={'flex items-center gap-5 rounded-[12px] border border-gray-300 px-5 py-2.5 lg:py-3.75'}>
          <Image src={'icon/icon_main_time.svg'} alt={''} width={24} height={24} className={'h-4 w-4 lg:h-6 lg:w-6'} />
          <div className={'flex flex-1 flex-col gap-1'}>
            <Text className={'text-[14px] font-semibold lg:text-[24px]'}>오늘 01:50 ~ 09:00</Text>
            <Text className={'text-[10px] font-medium text-gray-400! lg:text-[16px]'}>총 18시간 이용</Text>
          </div>
        </div>
        <div className={`flex flex-1 flex-col gap-3.75 ${isOpen ? 'overflow-hidden' : 'overflow-auto'}`}>
          <LabRentalItem />
          <LabRentalItem />
          <LabRentalItem />
          <LabRentalItem />
          <LabRentalItem />
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
