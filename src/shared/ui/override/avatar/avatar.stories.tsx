import { Avatar } from '.'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'overrides/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: '/test.png',
    alt: 'profile',
    width: 50,
    height: 50,
    imgClassName: 'h-[50px] w-[50px] rounded-full',
    children: <span className="text-[16px] font-medium">김교수</span>,
  },
}

export const WithoutImage: Story = {
  args: {
    imgClassName: 'h-[50px] w-[50px] rounded-full bg-gray-200',
    children: <span className="text-[16px] font-medium">이름 없음</span>,
  },
}
