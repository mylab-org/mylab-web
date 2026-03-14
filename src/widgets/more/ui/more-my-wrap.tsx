'use client'

import { Image } from 'next/dist/client/image-component'
import { DIALOG_MAP } from '@/shared/constant/dialog'
import { useDialogStore } from '@/shared/store/useDialogStore'
import { useSideModalStore } from '@/shared/store/useSideModalStore'
import { Button } from '@/shared/ui/button'
import { Tag } from '@/shared/ui/tag'
import { Text } from '@/shared/ui/text'
import { MoreMenuWrap } from '@/widgets/more/ui/more-menu-wrap'
import { MoreUserUpdate } from '@/widgets/more-side-content'

interface WrapProps {
  isMaxWidth?: boolean
}

export const MoreMyWrap = ({ isMaxWidth = false }: WrapProps) => {
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const openDialogModal = useDialogStore(state => state.openDialogModal)

  const handleLabDelete = () => {
    openDialogModal(DIALOG_MAP['LAB_DELETE'], '연구실 나가기', () => {
      console.log('나가기')
    })
  }

  return (
    <section className={`flex flex-[1_0_400px] flex-col gap-[10px] ${isMaxWidth && 'max-w-[550px]'}`}>
      <div className={'flex flex-col gap-[10px] rounded-[12px] bg-white md:p-[20px]'}>
        <div className={'flex items-center justify-between gap-[20px] py-[20px] md:justify-start'}>
          <div className={'h-[60px] w-[60px] rounded-full bg-gray-300 md:h-[100px] md:w-[100px]'}></div>
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
        <Button
          className={'text-[12px]! md:text-[16px]!'}
          onClick={() => openSideModal(MoreUserUpdate, '내 정보 수정')}
        >
          내 정보 수정
        </Button>
      </div>
      <MoreMenuWrap title={'나의 활동'}>
        <div className={'flex flex-col gap-[20px]'}>
          <Button.Menu>내 비품 대여 내역</Button.Menu>
          <Button.Menu>내 비품 신청 내역</Button.Menu>
          <Button.Menu>내가 작성한 글 확인</Button.Menu>
          <Button.Menu>내가 작성한 댓글 확인</Button.Menu>
          <Button.Menu isGray onClick={handleLabDelete}>
            연구실 나가기
          </Button.Menu>
        </div>
      </MoreMenuWrap>
    </section>
  )
}
