'use client'

import { useState } from 'react'
import { LabLinkModal } from '../../modal/lab-link-modal'
import { LabInfo } from '@/entities/lab'
import { LabLink } from '@/entities/lab/ui/lab-link'
import { LabMember } from '@/entities/lab/ui/lab-member'

export const LabLabInfoSection = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <div className={'flex flex-1 flex-col gap-7.5'}>
        <LabInfo className={'p-5 md:p-6'} isShadow />
        <LabLink setIsOpen={setIsOpen} />
        <LabMember />
      </div>
      <LabLinkModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
