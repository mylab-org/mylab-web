'use client'

import { Button } from '@/shared/ui/override/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/override/dialog'
import { Text } from '@/shared/ui/override/text'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onEnterLab?: () => void
}

const INFO_ROWS = [
  { key: 'universityName', label: '학교명', value: '' },
  { key: 'departmentName', label: '학과명', value: '' },
  { key: 'labName', label: '연구실명', value: '' },
  { key: 'professorName', label: '지도교수', value: '' },
] as const

export const LabsJoinPrevInfoModal = ({ open, onOpenChange, onEnterLab }: Props) => {
  const handleJoinLab = () => {
    onEnterLab?.()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="whitespace-pre-wrap">{'참여 전,\n연구실을 다시 확인하세요'}</DialogTitle>
          <DialogDescription>참여할 연구실 정보를 확인합니다.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col overflow-hidden rounded-2xl bg-gray-50">
          {INFO_ROWS.map(({ key, label, value }) => (
            <div key={key} className="flex flex-col gap-1 px-5 py-4">
              <Text className="text-[12px] font-medium text-gray-500!">{label}</Text>
              <Text className="text-[16px] font-semibold">{value}</Text>
            </div>
          ))}
        </div>
        <Button onClick={handleJoinLab}>연구실 입장하기</Button>
      </DialogContent>
    </Dialog>
  )
}
