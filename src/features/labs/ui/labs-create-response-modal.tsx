'use client'

import { useEffect, useState } from 'react'
import { postLabsInviteCodes } from '../api/post-labs-invite-codes'
import { LABS_CREATE_RESPONSE_INFO_ROWS } from '../config/const'
import { isUnauthorized } from '../lib'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import { Button } from '@/shared/ui/override/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/override/dialog'
import { Text } from '@/shared/ui/override/text'
import { IconInput } from '@/shared/ui/template/icon-input'
import type { PostLabsCreateResponseType } from '../model/types'

type Props = {
  open: boolean
  createLabResponse: PostLabsCreateResponseType | null
  ensureAccessToken?: (options?: { force?: boolean }) => Promise<string>
  onEnterLab?: () => void
  onOpenChange?: (open: boolean) => void
}

export const LabsCreateResponseModal = ({
  open,
  createLabResponse,
  ensureAccessToken,
  onEnterLab,
  onOpenChange,
}: Props) => {
  const [isCopy, setIsCopy] = useState<boolean>(false)
  const labId = createLabResponse?.labId

  const handleJoinLab = () => {
    onEnterLab?.()
  }

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setIsCopy(true)
  }

  const postLabsInviteCodesMutation = useApiMutation({
    mutationFn: async (labId: number) => {
      if (!ensureAccessToken) {
        return postLabsInviteCodes(labId, {})
      }

      const accessToken = await ensureAccessToken()
      try {
        return await postLabsInviteCodes(labId, {}, { accessToken })
      } catch (error) {
        if (!isUnauthorized(error)) {
          throw error
        }
        const nextAccessToken = await ensureAccessToken({ force: true })
        return postLabsInviteCodes(labId, {}, { accessToken: nextAccessToken })
      }
    },
  })

  useEffect(() => {
    if (labId !== undefined) postLabsInviteCodesMutation.mutate(labId)
  }, [labId])

  if (createLabResponse === null) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="whitespace-pre-wrap">{'생성 된,\n연구실 정보입니다.'}</DialogTitle>
          <DialogDescription>그럼 마이랩과 즐거운 연구 생활을 시작하세요.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col overflow-hidden rounded-2xl bg-gray-50">
          {LABS_CREATE_RESPONSE_INFO_ROWS.map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-1 px-5 py-4">
              <Text className="text-[12px] font-medium text-gray-500!">{label}</Text>
              <Text className="text-[16px] font-semibold">{createLabResponse[key]}</Text>
            </div>
          ))}
        </div>
        {postLabsInviteCodesMutation.data?.code && (
          <form>
            <IconInput
              state={isCopy}
              value={postLabsInviteCodesMutation.data?.code}
              readOnly
              onClick={() => handleCopy(postLabsInviteCodesMutation.data?.code)}
              className={'cursor-pointer'}
            />
            {isCopy ? (
              <Text className={'text-success text-[12px]'}>초대코드가 복사되었습니다</Text>
            ) : (
              <Text className={'text-[12px]'}>초대코드는 24시간동안 유효합니다</Text>
            )}
          </form>
        )}
        <Button onClick={handleJoinLab}>연구실 입장하기</Button>
      </DialogContent>
    </Dialog>
  )
}
