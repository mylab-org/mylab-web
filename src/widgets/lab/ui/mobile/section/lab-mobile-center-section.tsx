'use client'

import { useState } from 'react'
import { LabLinkModal } from '../../modal/lab-link-modal'
import { LabLink } from '@/entities/labs'

export const LabMobileCenterSection = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <LabLink setIsOpen={setIsOpen} />
      <LabLinkModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
