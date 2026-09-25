import { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '.'
import { Button } from '@/shared/ui/override/button'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'overrides/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>모달 열기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>연구실 생성</DialogTitle>
          <DialogDescription>연구실 정보를 입력하면 검토 후 생성됩니다.</DialogDescription>
        </DialogHeader>
        <p className="text-[14px] text-gray-600">기본 Dialog 예시입니다. 우측 상단 X 버튼으로 닫을 수 있습니다.</p>
      </DialogContent>
    </Dialog>
  ),
}

export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>닫기 버튼 없는 모달</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>확인이 필요합니다</DialogTitle>
          <DialogDescription>상단 X 버튼이 없는 Dialog입니다.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button color="main" className="w-full">
              확인
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const WithFooterActions: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>액션 푸터 모달</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>연구실 나가기</DialogTitle>
          <DialogDescription>연구실 탈퇴 전 데이터 백업 여부를 확인해주세요.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2.5 sm:justify-stretch">
          <DialogClose asChild>
            <Button color="secondary" className="w-full">
              취소
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button color="error" className="w-full">
              나가기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Controlled: Story = {
  render: function ControlledDialogStory() {
    const [open, setOpen] = useState(false)

    return (
      <div className="flex flex-col items-center gap-3">
        <Button onClick={() => setOpen(true)}>상태 제어로 열기</Button>
        <p className="text-[12px] text-gray-500">open: {String(open)}</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>연구실 참여</DialogTitle>
              <DialogDescription>open / onOpenChange로 제어하는 Dialog입니다.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button color="main" className="w-full" onClick={() => setOpen(false)}>
                닫기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  },
}

export const LongContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>긴 내용 모달</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>서비스 이용약관</DialogTitle>
          <DialogDescription>스크롤이 필요한 긴 콘텐츠 예시입니다.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 text-[14px] leading-relaxed text-gray-600">
          {Array.from({ length: 12 }, (_, index) => (
            <p key={index}>
              MyLab 서비스 이용과 관련된 안내 문구입니다. Dialog 본문이 길어질 경우 내부 스크롤로 확인할 수 있습니다. (
              {index + 1})
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button color="main" className="w-full">
              확인
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
