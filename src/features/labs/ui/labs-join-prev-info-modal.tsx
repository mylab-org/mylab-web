'use client'

import { LABS_JOIN_MODAL_PREV_INFO_ROWS } from '../config/const'
import { useLabsJoinHook } from '../model/use-labs-join-hook'
import type { LabsInviteCodesCheckValidateResponseType } from '@/entities/labs/model/types'
import { Button } from '@/shared/ui/override/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/override/dialog'
import { Text } from '@/shared/ui/override/text'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onEnterLab?: () => void
  code: string | null
  labInfo: LabsInviteCodesCheckValidateResponseType | null
  ensureAccessToken?: (options?: { force?: boolean }) => Promise<string>
}

export const LabsJoinPrevInfoModal = ({ open, onOpenChange, onEnterLab, code, labInfo, ensureAccessToken }: Props) => {
  const { joinLab, isPending } = useLabsJoinHook({ ensureAccessToken, onJoinSuccess: onEnterLab })

  const handleJoinLab = () => {
    if (code === null) return
    joinLab(code)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="whitespace-pre-wrap">{'참여 전,\n연구실을 다시 확인하세요'}</DialogTitle>
          <DialogDescription>참여할 연구실 정보를 확인합니다.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col overflow-hidden rounded-2xl bg-gray-50">
          {LABS_JOIN_MODAL_PREV_INFO_ROWS.map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-1 px-5 py-4">
              <Text className="text-[12px] font-medium text-gray-500!">{label}</Text>
              <Text className="text-[16px] font-semibold">{labInfo?.[key] ?? ''}</Text>
            </div>
          ))}
        </div>
        <Button onClick={handleJoinLab} disabled={isPending}>
          연구실 입장하기
        </Button>
      </DialogContent>
    </Dialog>
  )
}
