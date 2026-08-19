import {
  Skeleton,
  SkeletonAvatarRow,
  SkeletonCalendarListItem,
  SkeletonCalendarWeek,
  SkeletonCard,
  SkeletonLine,
  SkeletonListCard,
  SkeletonMemberRow,
  SkeletonTag,
  SkeletonTagGroup,
  SkeletonTitle,
  SkeletonWorkListItem,
  SkeletonWorkProgress,
} from '.'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'overrides/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'h-4 w-50',
  },
}

export const Circle: Story = {
  args: {
    circle: true,
    className: 'h-10 w-10',
  },
}

export const Title: Story = {
  render: () => <SkeletonTitle width="w-50" />,
}

export const Line: Story = {
  render: () => (
    <div className="flex w-70 flex-col gap-2">
      <SkeletonLine size="lg" width="w-full" />
      <SkeletonLine size="md" width="w-4/5" />
      <SkeletonLine size="sm" width="w-3/5" />
      <SkeletonLine size="xs" width="w-2/5" />
    </div>
  ),
}

export const Tag: Story = {
  render: () => <SkeletonTag width="w-30" />,
}

export const TagGroup: Story = {
  render: () => <SkeletonTagGroup count={4} />,
}

export const Card: Story = {
  render: () => (
    <SkeletonCard className="w-80">
      <SkeletonTitle />
      <SkeletonLine />
      <SkeletonTagGroup count={3} />
    </SkeletonCard>
  ),
}

export const ListCard: Story = {
  render: () => (
    <SkeletonListCard className="w-80">
      <SkeletonLine />
      <SkeletonLine size="xs" width="w-4/5" />
    </SkeletonListCard>
  ),
}

export const AvatarRow: Story = {
  render: () => <SkeletonAvatarRow />,
}

export const MemberRow: Story = {
  render: () => <SkeletonMemberRow />,
}

export const CalendarWeek: Story = {
  render: () => (
    <SkeletonCard className="w-80">
      <SkeletonTitle width="w-50" />
      <SkeletonCalendarWeek />
    </SkeletonCard>
  ),
}

export const CalendarListItem: Story = {
  render: () => (
    <div className="w-80">
      <SkeletonCalendarListItem />
    </div>
  ),
}

export const WorkProgress: Story = {
  render: () => (
    <div className="w-80">
      <SkeletonWorkProgress />
    </div>
  ),
}

export const WorkListItem: Story = {
  render: () => (
    <div className="w-80">
      <SkeletonWorkListItem />
    </div>
  ),
}

export const SectionExample: Story = {
  render: () => (
    <SkeletonCard className="w-80" padding="md">
      <SkeletonTitle width="w-80" />
      <SkeletonWorkListItem />
      <SkeletonWorkListItem />
    </SkeletonCard>
  ),
}
