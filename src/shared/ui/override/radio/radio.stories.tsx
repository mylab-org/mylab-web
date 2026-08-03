import { useState } from 'react'
import { Radio, RadioGroup } from '.'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'overrides/Radio',
  component: Radio,
} satisfies Meta<typeof Radio>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: '교수',
    value: 'professor',
  },
  render: function DefaultRender() {
    const [value, setValue] = useState('professor')

    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <Radio id="type1" value="professor" title="교수" />
        <Radio id="type2" value="student" title="연구원" />
      </RadioGroup>
    )
  },
}

export const Grade: Story = {
  args: {
    title: '학부생',
    value: '1',
  },
  render: function GradeRender() {
    const [value, setValue] = useState('1')

    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <Radio id="grade1" value="1" title="학부생" />
        <Radio id="grade2" value="2" title="석사" />
        <Radio id="grade3" value="3" title="박사" />
      </RadioGroup>
    )
  },
}
