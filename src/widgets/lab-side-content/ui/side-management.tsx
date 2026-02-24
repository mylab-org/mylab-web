import { SideManagenemtList, SidePostList } from '@/entities/lab-side'
import { Text } from '@/shared/ui'
import { Tab } from '@/widgets/tab'

export const SideManagement = () => {
  const tabs = [
    {
      name: '대여 목록 관리',
      content: <SideManagenemtList />,
    },
    {
      name: '비품 신청 내역',
      content: <SidePostList />,
    },
  ]

  return (
    <div className={'flex w-full flex-1 flex-col gap-[10px] lg:w-[700px]'}>
      <Tab tabs={tabs} leftItem={<Text className={'text-gray400! text-[18px] font-semibold'}>비품 추가하기</Text>} />
    </div>
  )
}
