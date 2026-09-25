'use client'

import { Button } from '@/shared/ui/override/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/override/dialog'
import { Text } from '@/shared/ui/override/text'
import type { PostLabsCreateResponseType } from '../model/types'

type Props = {
  open: boolean
  createLabResponse: PostLabsCreateResponseType | null
  onEnterLab?: () => void
  onOpenChange?: (open: boolean) => void
}

const INFO_ROWS = [
  { key: 'universityName', label: '학교명' },
  { key: 'departmentName', label: '학과명' },
  { key: 'labName', label: '연구실명' },
] as const

export const LabsCreateResponseModal = ({ open, createLabResponse, onEnterLab, onOpenChange }: Props) => {
  if (createLabResponse === null) return null

  const handleJoinLab = () => {
    onEnterLab?.()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="whitespace-pre-wrap">{'생성 된,\n연구실 정보입니다.'}</DialogTitle>
          <DialogDescription>그럼 마이랩과 즐거운 연구 생활을 시작하세요.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col overflow-hidden rounded-2xl bg-gray-50">
          {INFO_ROWS.map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-1 px-5 py-4">
              <Text className="text-[12px] font-medium text-gray-500!">{label}</Text>
              <Text className="text-[16px] font-semibold">{createLabResponse[key]}</Text>
            </div>
          ))}
        </div>
        <Button onClick={handleJoinLab}>연구실 입장하기</Button>
      </DialogContent>
    </Dialog>
  )
}
