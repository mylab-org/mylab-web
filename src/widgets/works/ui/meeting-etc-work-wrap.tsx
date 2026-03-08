import { Image } from 'next/dist/client/image-component'
import { useSideModalStore } from '@/shared/store'
import { Tag, Text } from '@/shared/ui'
import { WorkCreateContent } from '@/widgets/work-side-content'

export const MeetingEtcWorkWrap = () => {
  const openSideModal = useSideModalStore(state => state.openSideModal)
  return (
    <section className={'flex gap-[30px] p-[10px]'}>
      <section className={'flex w-[373] flex-col gap-[30px]'}>
        <div className={'flex items-center justify-between'}>
          <h4 className={'font-pretendard text-[22px] font-bold'}>시작 전</h4>
          <Image
            src={'icon/icon_main_add.svg'}
            alt={''}
            width={30}
            height={30}
            className={'cursor-pointer'}
            onClick={() => openSideModal(WorkCreateContent, '업무 생성')}
          />
        </div>
        <div className={'flex flex-col gap-[10px]'}>
          <div
            className={
              'bg-gray100 border-gray300 flex min-h-[165px] items-center justify-center rounded-[12px] border-2 border-dashed p-[20px]'
            }
          >
            <Text className={'text-gray400! text-[18px] font-semibold'}>아이템을 이곳에 드래그하여 옮길 수 있어요</Text>
          </div>
        </div>
      </section>
      <section className={'flex w-[373] flex-col gap-[30px]'}>
        <div className={'flex items-center justify-between'}>
          <h4 className={'font-pretendard text-[22px] font-bold'}>진행 중</h4>
          <Image
            src={'icon/icon_main_add.svg'}
            alt={''}
            width={30}
            height={30}
            className={'cursor-pointer'}
            onClick={() => openSideModal(WorkCreateContent, '업무 생성')}
          />
        </div>
        <div className={'flex flex-col gap-[10px]'}>
          <div
            className={
              'flex min-h-[165px] flex-col items-center gap-[20px] rounded-[12px] border-3 border-red-500 p-[20px] shadow-lg'
            }
          >
            <div className={'flex w-full flex-col gap-[5px]'}>
              <Tag.WorkType type={'MEET'} />
              <h5 className={'font-pretendard text-[18px] font-semibold'}>주어진 오토인코더 논문 리뷰 PPT 제작</h5>
            </div>
            <div className={'flex w-full flex-col gap-[5px]'}>
              <Text className={'text-[16px] font-normal'}>26.02.04(수) ~ 26.02.06(금)</Text>
              <Text className={'text-[16px] font-normal'}>설명</Text>
            </div>
          </div>
          <div
            className={
              'flex min-h-[165px] flex-col items-center gap-[20px] rounded-[12px] border-3 border-violet-500 p-[20px] shadow-lg'
            }
          >
            <div className={'flex w-full flex-col gap-[5px]'}>
              <Tag.WorkType type={'PERSONAL'} />
              <h5 className={'font-pretendard text-[18px] font-semibold'}>주어진 오토인코더 논문 리뷰 PPT 제작</h5>
            </div>
            <div className={'flex w-full flex-col gap-[5px]'}>
              <Text className={'text-[16px] font-normal'}>26.02.04(수) ~ 26.02.06(금)</Text>
              <Text className={'text-[16px] font-normal'}>설명</Text>
            </div>
          </div>
        </div>
      </section>
      <section className={'flex w-[373] flex-col gap-[30px]'}>
        <h4 className={'font-pretendard text-[22px] font-bold'}>완료</h4>
        <div className={'flex flex-col gap-[10px]'}>
          <div
            className={
              'bg-gray100 border-gray300 flex min-h-[165px] items-center justify-center rounded-[12px] border-2 border-dashed p-[20px]'
            }
          >
            <Text className={'text-gray400! text-[18px] font-semibold'}>아이템을 이곳에 드래그하여 옮길 수 있어요</Text>
          </div>
        </div>
      </section>
    </section>
  )
}
