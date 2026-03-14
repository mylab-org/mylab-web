'use client'

import { useState } from 'react'
import { SideRentalList } from '@/entities/lab-side'
import { SideRentalTime } from '@/features/lab-side-modal'
import { Button } from '@/shared/ui/button'
import { SideModalWrap } from '@/widgets/modal'

export const SideRental = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-[10px] px-[20px] lg:w-[750px] lg:px-[30px]'}>
      <SideRentalList isBottom={isOpen} />
      <Button className={'mb-[20px]'} onClick={() => setIsOpen(true)}>
        대여 시간 변경하기
      </Button>
      <SideModalWrap isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SideRentalTime />
      </SideModalWrap>
    </div>
  )
}
