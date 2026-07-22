import { CheckBox } from '.'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'overrides/CheckBox',
  component: CheckBox,
} satisfies Meta<typeof CheckBox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: '익명',
  },
}

export const WithAfter: Story = {
  args: {
    title: '랩장',
    after: true,
  },
}

export const Checked: Story = {
  args: {
    title: '전체',
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    title: '비활성화',
    disabled: true,
  },
}
