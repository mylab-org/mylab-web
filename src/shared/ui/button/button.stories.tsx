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
