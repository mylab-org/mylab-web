import { useState } from 'react'
import { Switch } from '.'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'overrides/Switch',
  component: Switch,
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function DefaultRender() {
    const [isSwitch, setIsSwitch] = useState(false)

    return (
      <Switch
        isSwitch={isSwitch}
        onSwitch={() => setIsSwitch(prev => !prev)}
        title={<span className="text-[14px] font-bold">대여 활성화</span>}
      />
    )
  },
}

export const WithDescription: Story = {
  render: function WithDescriptionRender() {
    const [isSwitch, setIsSwitch] = useState(true)

    return (
      <Switch
        isSwitch={isSwitch}
        onSwitch={() => setIsSwitch(prev => !prev)}
        isBetween
        title={<span className="text-[14px] font-bold">업무 시간 외 알림 금지 설정</span>}
        description={
          <span className="text-[12px] font-medium text-gray-600">
            9시 ~ 18시 외 발생하는 푸시알림 유무를 선택합니다.
          </span>
        }
      />
    )
  },
}
