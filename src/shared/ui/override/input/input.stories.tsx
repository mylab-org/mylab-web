import { Input } from '.'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'overrides/Input',
  component: Input,
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: '이름을 입력하세요',
    className: 'w-full',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
    className: 'w-full',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: '비활성화',
    className: 'w-full',
    disabled: true,
  },
}
