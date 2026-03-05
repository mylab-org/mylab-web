'use client'

import { DIALOG_MAP } from '@/shared/constant/dialog'
import { useDialogStore } from '@/shared/store/useDialogStore'
import { useSideModalStore } from '@/shared/store/useSideModalStore'
import { Button, Tag, Text } from '@/shared/ui'
import { MoreMenuWrap } from '@/widgets/more/ui/more-menu-wrap'
import { MoreUserUpdate } from '@/widgets/more-side-content'

export const MoreMyWrap = () => {
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const openDialogModal = useDialogStore(state => state.openDialogModal)

  const handleLabDelete = () => {
    openDialogModal(DIALOG_MAP['LAB_DELETE'], '연구실 나가기', () => {
      console.log('나가기')
    })
  }

  return (
    <section className={'flex flex-1 shrink-0 flex-col gap-[10px]'}>
      <div className={'flex flex-col gap-[10px] rounded-[12px] bg-white p-[20px]'}>
        <div className={'flex gap-[20px] py-[20px]'}>
          <div className={'bg-gray300 h-[100px] w-[100px] rounded-full'}></div>
          <div className={'flex flex-col gap-[5px] p-[10px]'}>
            <div className={'flex gap-[10px]'}>
              <Text className={'text-[16px] font-bold whitespace-pre-wrap md:text-[20px]'}>홍길동님</Text>
              <div className={'flex gap-[5px]'}>
                <Tag.Roll variant={'leader'} />
                <Tag.Roll variant={'doctoral'} />
              </div>
            </div>
            <div className={'text-[10px] font-medium md:text-[14px]'}>
              <Text className={'text-gray-600!'}>BIT Lab · 컴퓨터 통신</Text>
              <Text className={'text-gray-600!'}>wlsdud6221@naver.com</Text>
            </div>
          </div>
        </div>
        <Button onClick={() => openSideModal(MoreUserUpdate, '내 정보 수정')}>내 정보 수정</Button>
      </div>
      <MoreMenuWrap title={'나의 활동'}>
        <div className={'flex flex-col gap-[20px]'}>
          <Text className={'text-[16px] font-medium'}>내 비품 대여 내역</Text>
          <Text className={'text-[16px] font-medium'}>내 비품 신청 내역</Text>
          <Text className={'text-[16px] font-medium'}>내가 작성한 글 확인</Text>
          <Text className={'text-[16px] font-medium'}>내가 작성한 댓글 확인</Text>
          <Text className={'text-gray400! text-[16px] font-medium'} onClick={handleLabDelete}>
            연구실 나가기
          </Text>
        </div>
      </MoreMenuWrap>
    </section>
  )
}
