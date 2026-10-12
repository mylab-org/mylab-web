import { Ellipsis } from 'lucide-react'
import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '.'
import { Button } from '@/shared/ui/override/button'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'overrides/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DropdownMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger className={'shrink-0 cursor-pointer rounded-[8px] p-1 outline-none hover:bg-gray-100'}>
        <Ellipsis strokeWidth={2} className={'size-5'} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'}>
        <DropdownMenuItem>수정</DropdownMenuItem>
        <DropdownMenuItem variant={'destructive'}>삭제</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithButtonTrigger: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>메뉴 열기</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>내 정보 수정</DropdownMenuItem>
        <DropdownMenuItem>비밀번호 변경</DropdownMenuItem>
        <DropdownMenuItem variant={'destructive'}>회원 탈퇴</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithDisabledItem: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>비활성 항목 포함</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>수정</DropdownMenuItem>
        <DropdownMenuItem disabled>공유 (준비 중)</DropdownMenuItem>
        <DropdownMenuItem variant={'destructive'}>삭제</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const Controlled: Story = {
  render: function ControlledDropdownMenuStory() {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState('-')

    return (
      <div className="flex flex-col items-center gap-3">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button>상태 제어로 열기</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setSelected('수정')}>수정</DropdownMenuItem>
            <DropdownMenuItem variant={'destructive'} onSelect={() => setSelected('삭제')}>
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <p className="text-[12px] text-gray-500">open: {String(open)}</p>
        <p className="text-[12px] text-gray-500">선택한 항목: {selected}</p>
      </div>
    )
  },
}
