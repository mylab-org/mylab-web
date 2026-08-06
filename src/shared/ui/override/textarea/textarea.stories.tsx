import { Textarea } from '.'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'overrides/Textarea',
  component: Textarea,
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    className: 'h-[100px] w-full border border-gray-300 p-2.5 text-[14px]',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: '비활성화',
    className: 'h-[100px] w-full border border-gray-300 p-2.5 text-[14px]',
    disabled: true,
  },
}
