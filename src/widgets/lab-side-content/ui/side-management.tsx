import { SideManagenemtList, SidePostList } from '@/entities/lab-side'
import { Button, Text } from '@/shared/ui'
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
    <div className={'flex w-full flex-1 flex-col gap-[10px] px-[30px] lg:w-[750px]'}>
      <Tab tabs={tabs} leftItem={<Text className={'text-gray400! text-[18px] font-semibold'}>비품 추가하기</Text>} />
      {/*<section*/}
      {/*  className={*/}
      {/*    'bg-gray900/20 absolute top-0 right-0 flex h-full w-full items-end overflow-hidden lg:rounded-l-[20px]'*/}
      {/*  }*/}
      {/*>*/}
      {/*  <div className={'flex w-full flex-col rounded-t-[24px] bg-white px-[40px]'}>*/}
      {/*    <div className={'flex h-[20px] items-center justify-center'}>*/}
      {/*      <div className={'h-[5px] w-[200px] rounded-[10px] bg-gray-200'}></div>*/}
      {/*    </div>*/}
      {/*    <div className={'flex flex-1 flex-col'}>*/}
      {/*      <div className={'flex w-full items-center justify-center'}>*/}
      {/*        <div*/}
      {/*          className={*/}
      {/*            'flex flex-1 flex-col items-center justify-center gap-[5px] border-b-4 border-b-gray-600 pt-[10px] pb-[20px]'*/}
      {/*          }*/}
      {/*        >*/}
      {/*          <Text className={'text-[18px] font-bold'}>대여 일시</Text>*/}
      {/*          <Text className={'text-[24px] font-medium text-gray-600!'}>02/07 (토) 02:40</Text>*/}
      {/*        </div>*/}
      {/*        <div className={'flex flex-1 flex-col items-center justify-center gap-[5px] pt-[10px] pb-[20px]'}>*/}
      {/*          <Text className={'text-[18px] font-bold'}>대여 일시</Text>*/}
      {/*          <Text className={'text-[24px] font-medium text-gray-600!'}>02/07 (토) 02:40</Text>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className={'flex flex-1 items-center justify-center gap-[40px] p-[10px]'}>*/}
      {/*        <Text className={'text-[30px] font-medium'}>오늘 (토)</Text>*/}
      {/*        <Text className={'text-[34px] font-medium'}>02</Text>*/}
      {/*        <Text className={'text-[20px] font-medium'}>:</Text>*/}
      {/*        <Text className={'text-[34px] font-medium'}>40</Text>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <Button className={'bg-blue500! mt-[10px] mb-[20px]'}>총 2시간 대여</Button>*/}
      {/*  </div>*/}
      {/*</section>*/}
    </div>
  )
}
