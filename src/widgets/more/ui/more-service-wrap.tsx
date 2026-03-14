'use client'

import { DIALOG_MAP } from '@/shared/constant/dialog'
import { useConfirmStore } from '@/shared/store'
import { useDialogStore } from '@/shared/store/useDialogStore'
import { useSideModalStore } from '@/shared/store/useSideModalStore'
import { Button } from '@/shared/ui/button'
import { MoreMenuWrap } from '@/widgets/more/ui/more-menu-wrap'
import { MoreToggleWrap } from '@/widgets/more/ui/more-toggle-wrap'
import { MoreServiceUse, MoreUserPw } from '@/widgets/more-side-content'

interface WrapProps {
  isMaxWidth?: boolean
}

export const MoreServiceWrap = ({ isMaxWidth = false }: WrapProps) => {
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const openDialogModal = useDialogStore(state => state.openDialogModal)
  const onOpenConfirm = useConfirmStore(state => state.onOpenConfirm)

  const handleServiceLeave = () => {
    openDialogModal(DIALOG_MAP['SERVICE_LEAVE'], '회원 탈퇴', () => {
      console.log('탈퇴')
    })
  }

  return (
    <section className={`flex flex-[1_0_400px] flex-col gap-[10px] ${isMaxWidth && 'max-w-[550px]'}`}>
      <MoreMenuWrap title={'서비스 설정'}>
        <div className={'flex flex-col gap-[20px]'}>
          <div>
            <h5 className={'font-pretendard text-[12px] font-bold md:text-[16px]'}>테마 설정</h5>
            <div className={'flex items-center justify-between p-[10px]'}>
              <Button.Setup isActive>시스템 설정</Button.Setup>
              <Button.Setup>라이트</Button.Setup>
              <Button.Setup>다크</Button.Setup>
            </div>
          </div>
          <div className={'flex flex-col gap-[10px]'}>
            <MoreToggleWrap
              title={'업무 시간 외 알림 금지 설정'}
              description={'9시 ~ 18시 외 발생하는 푸시알림 유무를 선택합니다.'}
            />
            <MoreToggleWrap
              title={'자정 시간 알림 금지 설정'}
              description={'0시 ~ 6시까지 발생하는 푸시알림 유무를 선택합니다.'}
            />
          </div>
        </div>
      </MoreMenuWrap>
      <MoreMenuWrap title={'이용 안내'}>
        <div className={'flex flex-col gap-[20px]'}>
          <Button.Menu onClick={() => openSideModal(MoreServiceUse, '서비스 이용약관')}>서비스 이용약관</Button.Menu>
          <Button.Menu>1:1 문의내역</Button.Menu>
        </div>
      </MoreMenuWrap>
      <MoreMenuWrap title={'계정'}>
        <div className={'flex flex-col gap-[20px]'}>
          <Button.Menu onClick={() => openSideModal(MoreUserPw, '비밀번호 변경')}>비밀번호 변경</Button.Menu>
          <Button.Menu onClick={() => onOpenConfirm('로그아웃 하시겠습니까?', () => console.log('로그아웃'))}>
            로그아웃
          </Button.Menu>
          <Button.Menu onClick={handleServiceLeave} isGray>
            회원 탈퇴
          </Button.Menu>
        </div>
      </MoreMenuWrap>
    </section>
  )
}
