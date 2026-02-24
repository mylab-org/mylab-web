import { SideStuPostList } from '@/entities/lab-side'
import { Button } from '@/shared/ui'
import { Tab } from '@/widgets/tab'

export const SidePost = () => {
  const tabs = [
    {
      name: '비품 신청 내역',
      content: <SideStuPostList />,
    },
    {
      name: '비품 승인 내역',
      content: <SideStuPostList />,
    },
  ]

  return (
    <div className={'flex w-full flex-1 flex-col gap-[10px] lg:w-[700px]'}>
      <Tab tabs={tabs} />
      <Button className={'mb-[20px]'}>비품 신청하기</Button>
    </div>
  )
}
