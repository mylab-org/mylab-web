'use client'

import { useState } from 'react'
import type { LabsInviteCodesCheckValidateResponseType } from '@/entities/labs/model/types'
import { LabsCreateForm, LabsCreateResponseModal, LabsJoinForm, LabsJoinPrevInfoModal } from '@/features/labs'
import type { PostLabsCreateResponseType } from '@/features/labs/model/types'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/override/dialog'

type Props = {
  open: boolean
  onClose: () => void
  onHide: () => void
  type: 'create' | 'join'
  ensureAccessToken?: (options?: { force?: boolean }) => Promise<string>
  onLabFlowSuccess?: () => void
  userName: string
}

export const LoginLabCreateJoinModal = ({
  open,
  onClose,
  onHide,
  type,
  ensureAccessToken,
  onLabFlowSuccess,
  userName,
}: Props) => {
  const [createLabResponse, setCreateLabResponse] = useState<PostLabsCreateResponseType | null>(null)
  const [joinPrevInfo, setJoinPrevInfo] = useState<{
    code: string
    labInfo: LabsInviteCodesCheckValidateResponseType
  } | null>(null)

  const handleCreateSuccess = (data: PostLabsCreateResponseType) => {
    setCreateLabResponse(data)
    onHide()
  }

  const handleJoinPrevInfoOpen = (code: string, labInfo: LabsInviteCodesCheckValidateResponseType) => {
    setJoinPrevInfo({ code, labInfo })
    onHide()
  }

  const handleCreateResponseOpenChange = (nextOpen: boolean) => {
    if (nextOpen) return
    setCreateLabResponse(null)
    onClose()
  }

  const handleJoinPrevInfoOpenChange = (nextOpen: boolean) => {
    if (nextOpen) return
    setJoinPrevInfo(null)
    onClose()
  }

  const handleEnterLab = () => {
    onLabFlowSuccess?.()
    setCreateLabResponse(null)
    setJoinPrevInfo(null)
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
            <DialogTitle className="sr-only">{type === 'create' ? '연구실 생성' : '연구실 참여'}</DialogTitle>
            <DialogDescription className="sr-only">연구실을 생성하거나 참여합니다.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            {type === 'create' ? (
              <LabsCreateForm
                ensureAccessToken={ensureAccessToken}
                onCreateSuccess={handleCreateSuccess}
                userName={userName}
              />
            ) : (
              <LabsJoinForm onJoinPrevInfoOpen={handleJoinPrevInfoOpen} userName={userName} />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <LabsCreateResponseModal
        open={createLabResponse !== null}
        createLabResponse={createLabResponse}
        ensureAccessToken={ensureAccessToken}
        onOpenChange={handleCreateResponseOpenChange}
        onEnterLab={handleEnterLab}
      />

      <LabsJoinPrevInfoModal
        open={joinPrevInfo !== null}
        onOpenChange={handleJoinPrevInfoOpenChange}
        onEnterLab={handleEnterLab}
        code={joinPrevInfo?.code ?? null}
        labInfo={joinPrevInfo?.labInfo ?? null}
        ensureAccessToken={ensureAccessToken}
      />
    </>
  )
}
