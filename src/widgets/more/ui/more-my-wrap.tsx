'use client'

import { MoreMenuWrap } from './more-menu-wrap'
import { MoreUserUpdate } from './side/more-user-update'
import { UserInfo } from '@/entities/user'
import { DIALOG_MAP } from '@/shared/constant/dialog'
import { useDialogStore, useSideModalStore } from '@/shared/store'
import { Button } from '@/shared/ui/button'

interface WrapProps {
  isMaxWidth?: boolean
  isMobile?: boolean
}

export const MoreMyWrap = ({ isMaxWidth = false, isMobile = false }: WrapProps) => {
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const openDialogModal = useDialogStore(state => state.openDialogModal)

  const handleLabDelete = () => {
    openDialogModal(DIALOG_MAP['LAB_DELETE'], '연구실 나가기', () => {
      console.log('나가기')
    })
  }

  return (
    <section className={`flex flex-[1_0_400px] flex-col gap-2.5 ${isMaxWidth && 'max-w-[550px]'}`}>
      <div
        className={`flex flex-col gap-2.5 rounded-[12px] bg-white ${isMobile ? 'p-3' : 'p-5'} shadow-[0px_1px_3px_rgba(0,0,0,0.03),0px_4px_16px_rgba(0,0,0,0.04)]`}
      >
        <UserInfo />
        <Button
          className={'text-[12px]! md:text-[16px]!'}
          onClick={() => openSideModal(MoreUserUpdate, '내 정보 수정')}
        >
          내 정보 수정
        </Button>
      </div>
      <MoreMenuWrap title={'나의 활동'} isMobile={isMobile}>
        <div className={'flex flex-col gap-5'}>
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
