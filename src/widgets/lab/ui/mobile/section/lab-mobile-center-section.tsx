'use client'

import { useState } from 'react'
import { LabLink } from '../../../../../entities/lab/ui/lab-link'
import { LabLinkModal } from '../../modal/lab-link-modal'

export const LabMobileCenterSection = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <LabLink setIsOpen={setIsOpen} />
      <LabLinkModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
