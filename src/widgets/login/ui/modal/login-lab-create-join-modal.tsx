'use client'

import { useState } from 'react'
import { LabsJoinPrevInfoModal } from '@/entities/labs'
import { LabsCreateForm, LabsCreateResponseModal, LabsJoinForm } from '@/features/labs'
import type { PostLabsCreateResponseType } from '@/features/labs/model/types'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/override/dialog'

type Props = {
  open: boolean
  onClose: () => void
  onHide: () => void
  type: 'create' | 'join'
  ensureAccessToken?: (options?: { force?: boolean }) => Promise<string>
  onLabFlowSuccess?: () => void
}

export const LoginLabCreateJoinModal = ({
  open,
  onClose,
  onHide,
  type,
  ensureAccessToken,
  onLabFlowSuccess,
}: Props) => {
  const [createLabResponse, setCreateLabResponse] = useState<PostLabsCreateResponseType | null>(null)
  const [isJoinPrevInfoModalOpen, setIsJoinPrevInfoModalOpen] = useState(false)

  const handleCreateSuccess = (data: PostLabsCreateResponseType) => {
    setCreateLabResponse(data)
    onHide()
  }

  const handleJoinPrevInfoOpen = () => {
    setIsJoinPrevInfoModalOpen(true)
    onHide()
  }

  const handleCreateResponseOpenChange = (nextOpen: boolean) => {
    if (nextOpen) return
    setCreateLabResponse(null)
    onClose()
  }

  const handleJoinPrevInfoOpenChange = (nextOpen: boolean) => {
    setIsJoinPrevInfoModalOpen(nextOpen)
    if (!nextOpen) {
      onClose()
    }
  }

  const handleEnterLab = () => {
    onLabFlowSuccess?.()
    setCreateLabResponse(null)
    setIsJoinPrevInfoModalOpen(false)
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={nextOpen => {
          if (!nextOpen) {
            onClose()
          }
        }}
      >
        <DialogContent showCloseButton>
          <DialogHeader>
            <DialogTitle>{type === 'create' ? '연구실 생성' : '연구실 참여'}</DialogTitle>
            <DialogDescription className="sr-only">연구실을 생성하거나 참여합니다.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            {type === 'create' ? (
              <LabsCreateForm hideTitle ensureAccessToken={ensureAccessToken} onCreateSuccess={handleCreateSuccess} />
            ) : (
              <LabsJoinForm
                hideTitle
                ensureAccessToken={ensureAccessToken}
                onJoinPrevInfoOpen={handleJoinPrevInfoOpen}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <LabsCreateResponseModal
        open={createLabResponse !== null}
        createLabResponse={createLabResponse}
        onOpenChange={handleCreateResponseOpenChange}
        onEnterLab={handleEnterLab}
      />

      <LabsJoinPrevInfoModal
        open={isJoinPrevInfoModalOpen}
        onOpenChange={handleJoinPrevInfoOpenChange}
        onEnterLab={handleEnterLab}
      />
    </>
  )
}
