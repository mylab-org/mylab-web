'use client'

import { DIALOG_MAP } from '@/shared/constant/dialog'
import { useConfirmStore } from '@/shared/store'
import { useDialogStore } from '@/shared/store/useDialogStore'
import { useSideModalStore } from '@/shared/store/useSideModalStore'
import { ActiveBtn, MoreMenuBtn, Text, ToggleSwitch } from '@/shared/ui'
import { MoreMenuWrap } from '@/widgets/more/ui/more-menu-wrap'
import { MoreToggleWrap } from '@/widgets/more/ui/more-toggle-wrap'
import { MoreServiceUse, MoreUserPw } from '@/widgets/more-side-content'

interface WrapProps {
  width?: string
}

export const MoreServiceWrap = ({ width }: WrapProps) => {
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const openDialogModal = useDialogStore(state => state.openDialogModal)
  const onOpenConfirm = useConfirmStore(state => state.onOpenConfirm)

  const handleServiceLeave = () => {
    openDialogModal(DIALOG_MAP['SERVICE_LEAVE'], '회원 탈퇴', () => {
      console.log('탈퇴')
    })
  }

  return (
    <section className={`flex shrink-1 flex-col gap-[10px] ${width ? width : 'flex-1'}`}>
      <MoreMenuWrap title={'서비스 설정'}>
        <div className={'flex flex-col gap-[20px]'}>
          <div>
            <h5 className={'font-pretendard text-[12px] font-bold md:text-[16px]'}>테마 설정</h5>
            <div className={'flex items-center justify-between p-[10px]'}>
              <ActiveBtn active>시스템 설정</ActiveBtn>
              <ActiveBtn>라이트</ActiveBtn>
              <ActiveBtn>다크</ActiveBtn>
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
          <MoreMenuBtn onClick={() => openSideModal(MoreServiceUse, '서비스 이용약관')}>서비스 이용약관</MoreMenuBtn>
          <MoreMenuBtn>1:1 문의내역</MoreMenuBtn>
        </div>
      </MoreMenuWrap>
      <MoreMenuWrap title={'계정'}>
        <div className={'flex flex-col gap-[20px]'}>
          <MoreMenuBtn onClick={() => openSideModal(MoreUserPw, '비밀번호 변경')}>비밀번호 변경</MoreMenuBtn>
          <MoreMenuBtn onClick={() => onOpenConfirm('로그아웃 하시겠습니까?', () => console.log('로그아웃'))}>
            로그아웃
          </MoreMenuBtn>
          <MoreMenuBtn isGray onClick={handleServiceLeave}>
            회원 탈퇴
          </MoreMenuBtn>
        </div>
      </MoreMenuWrap>
    </section>
  )
}
