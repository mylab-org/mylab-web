import { SideLabDataList } from '@/entities/lab-side'
import { Button } from '@/shared/ui'
import { Tab } from '@/widgets/tab'

export const SideData = () => {
  const tabs = [
    {
      name: '논문 및 저널',
      content: <SideLabDataList />,
    },
    {
      name: '연구 참고 자료',
      content: <SideLabDataList />,
    },
  ]

  return (
    <div className={'flex w-full flex-1 flex-col gap-[10px] lg:w-[700px]'}>
      <Tab tabs={tabs} />
      <Button className={'mb-[20px]'}>자료 등록하기</Button>
    </div>
  )
}
