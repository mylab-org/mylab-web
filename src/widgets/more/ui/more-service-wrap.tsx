'use client'

import { DIALOG_MAP } from '@/shared/constant/dialog'
import { useDialogStore } from '@/shared/store/useDialogStore'
import { useSideModalStore } from '@/shared/store/useSideModalStore'
import { Text, ToggleSwitch } from '@/shared/ui'
import { MoreMenuWrap } from '@/widgets/more/ui/more-menu-wrap'
import { MoreServiceUse, MoreUserPw } from '@/widgets/more-side-content'

export const MoreServiceWrap = () => {
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const openDialogModal = useDialogStore(state => state.openDialogModal)

  const handleServiceLeave = () => {
    openDialogModal(DIALOG_MAP['SERVICE_LEAVE'], '회원 탈퇴', () => {
      console.log('탈퇴')
    })
  }

  return (
    <section className={'flex flex-1 shrink-0 flex-col gap-[10px]'}>
      <MoreMenuWrap title={'서비스 설정'}>
        <div className={'flex flex-col gap-[20px]'}>
          <div>
            <h5 className={'font-pretendard text-[16px] font-bold'}>테마 설정</h5>
            <div className={'flex items-center justify-between p-[10px]'}>
              <Text
                className={
                  'min-w-[80px] rounded-[10px] bg-gray-200 px-[10px] py-[5px] text-center text-[16px] font-semibold'
                }
              >
                시스템 설정
              </Text>
              <Text
                className={
                  'text-gray400! min-w-[80px] rounded-[10px] px-[10px] py-[5px] text-center text-[16px] font-semibold'
                }
              >
                라이트
              </Text>
              <Text
                className={
                  'text-gray400! min-w-[80px] rounded-[10px] px-[10px] py-[5px] text-center text-[16px] font-semibold'
                }
              >
                다크
              </Text>
            </div>
          </div>
          <div className={'flex flex-col gap-[10px]'}>
            <div className={'flex flex-col gap-[5px]'}>
              <div className={'flex items-center justify-between'}>
                <Text className={'text-[16px] font-bold'}>업무 시간 외 알림 금지 설정</Text>
                <ToggleSwitch isSwitch={true} onSwitch={() => {}} />
              </div>
              <Text className={'text-[14px] font-medium text-gray-600!'}>
                9시 ~ 18시 외 발생하는 푸시알림 유무를 선택합니다.
              </Text>
            </div>
            <div className={'flex flex-col gap-[5px]'}>
              <div className={'flex items-center justify-between'}>
                <Text className={'text-[16px] font-bold'}>자정 시간 알림 금지 설정</Text>
                <ToggleSwitch isSwitch={true} onSwitch={() => {}} />
              </div>
              <Text className={'text-[14px] font-medium text-gray-600!'}>
                0시 ~ 6시까지 발생하는 푸시알림 유무를 선택합니다.
              </Text>
            </div>
          </div>
        </div>
      </MoreMenuWrap>
      <MoreMenuWrap title={'이용 안내'}>
        <div className={'flex flex-col gap-[20px]'}>
          <Text className={'text-[16px] font-medium'} onClick={() => openSideModal(MoreServiceUse, '서비스 이용약관')}>
            서비스 이용약관
          </Text>
          <Text className={'text-[16px] font-medium'}>1:1 문의내역</Text>
        </div>
      </MoreMenuWrap>
      <MoreMenuWrap title={'계정'}>
        <div className={'flex flex-col gap-[20px]'}>
          <Text className={'text-[16px] font-medium'} onClick={() => openSideModal(MoreUserPw, '비밀번호 변경')}>
            비밀번호 변경
          </Text>
          <Text className={'text-[16px] font-medium'}>로그아웃</Text>
          <Text className={'text-gray400! text-[16px] font-medium'} onClick={handleServiceLeave}>
            회원 탈퇴
          </Text>
        </div>
      </MoreMenuWrap>
    </section>
  )
}
