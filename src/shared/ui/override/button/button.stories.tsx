import { Button } from '.'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'overrides/Button',
  component: Button,
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '버튼입니다.',
  },
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2.5">
      <Button color="main">main</Button>
      <Button color="secondary">secondary</Button>
      <Button color="black">black</Button>
      <Button color="error">error</Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    children: '비활성화',
    disabled: true,
  },
}

export const WithIcon: Story = {
  args: {
    children: '가입하기',
    iconPosition: 'after',
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    ),
  },
}

export const Menu: Story = {
  render: () => (
    <div className="flex flex-col gap-2.5">
      <Button.Menu>메뉴 버튼</Button.Menu>
      <Button.Menu isGray>회색 메뉴</Button.Menu>
    </div>
  ),
}

export const Setup: Story = {
  render: () => (
    <div className="flex gap-2.5">
      <Button.Setup isActive>시스템 설정</Button.Setup>
      <Button.Setup>라이트</Button.Setup>
      <Button.Setup>다크</Button.Setup>
    </div>
  ),
}

export const Link: Story = {
  render: () => (
    <Button.Link href="/login" className="text-main">
      로그인하러 가기
    </Button.Link>
  ),
}
