'use client'

import { MoreMenuRow } from './more-menu-row'
import { MoreServiceUse } from './side/more-service-use'
import { postAuthLogout } from '@/features/auth/api/post-auth-logout'
import { UserPasswordUpdateForm } from '@/features/user'
import { deleteUsersMe } from '@/features/user/api/delete-users-me'
import { DIALOG_MAP } from '@/shared/constant/dialog'
import { clearAccessToken, runLogoutHandler } from '@/shared/lib/token/client-access-token-store'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import { useConfirmStore, useDialogStore, useSideModalStore } from '@/shared/store'
import { Button } from '@/shared/ui/override/button'
import { Text } from '@/shared/ui/override/text'
import { MoreMenuContentWrap } from '@/shared/ui/template/more-menu-content-wrap'

interface WrapProps {
  isMobile?: boolean
}

export const MoreServiceSection = ({ isMobile = false }: WrapProps) => {
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const openDialogModal = useDialogStore(state => state.openDialogModal)
  const onOpenConfirm = useConfirmStore(state => state.onOpenConfirm)

  const deleteUsersMeMutation = useApiMutation({
    mutationFn: deleteUsersMe,
    successMessage: '회원 탈퇴가 완료되었습니다.',
    defaultErrorMessage: '회원 탈퇴에 실패했습니다.',
    onSuccess: async () => {
      clearAccessToken()
      await runLogoutHandler()
    },
  })

  const handleServiceLeave = () => {
    openDialogModal(DIALOG_MAP['SERVICE_LEAVE'], '회원 탈퇴', () => {
      deleteUsersMeMutation.mutate()
    })
  }

  const postAuthLogoutMutation = useApiMutation({
    mutationFn: postAuthLogout,
    successMessage: '로그아웃이 완료되었습니다.',
    defaultErrorMessage: '로그아웃에 실패했습니다.',
    onSuccess: async () => {
      clearAccessToken()
      await runLogoutHandler()
    },
  })

  return (
    <section className={'flex w-full flex-col gap-3'}>
      <MoreMenuContentWrap title={'서비스 설정'} isMobile={isMobile}>
        <div className={'flex flex-col gap-4'}>
          <div className={'flex flex-col gap-2'}>
            <div className={'flex items-center justify-between gap-2'}>
              <h5 className={'text-[13px] font-bold md:text-[15px]'}>테마 설정</h5>
              <span className={'bg-muted text-subtle-foreground rounded-full px-2 py-0.5 text-[11px] font-semibold'}>
                준비 중
              </span>
            </div>
            <div className={'flex items-center gap-2 opacity-50'}>
              <Button.Setup isActive className={'pointer-events-none flex-1'}>
                시스템
              </Button.Setup>
              <Button.Setup className={'pointer-events-none flex-1'}>라이트</Button.Setup>
              <Button.Setup className={'pointer-events-none flex-1'}>다크</Button.Setup>
            </div>
          </div>
          <div className={'bg-muted flex flex-col gap-2 rounded-[12px] px-3 py-3'}>
            <div className={'flex items-center justify-between gap-2'}>
              <Text className={'text-[13px] font-bold md:text-[15px]'}>알림 설정</Text>
              <span className={'bg-card text-subtle-foreground rounded-full px-2 py-0.5 text-[11px] font-semibold'}>
                준비 중
              </span>
            </div>
            <Text className={'text-muted-foreground! text-[12px] font-medium'}>
              업무 시간 외·자정 시간 알림 금지는 추후 제공될 예정입니다.
            </Text>
          </div>
        </div>
      </MoreMenuContentWrap>

      <MoreMenuContentWrap title={'이용 안내'} isMobile={isMobile}>
        <div className={'flex flex-col gap-1'}>
          <MoreMenuRow label={'서비스 이용약관'} onClick={() => openSideModal(MoreServiceUse, '서비스 이용약관')} />
          <MoreMenuRow label={'1:1 문의내역'} upcoming />
        </div>
      </MoreMenuContentWrap>

      <MoreMenuContentWrap title={'계정'} isMobile={isMobile}>
        <div className={'flex flex-col gap-1'}>
          <MoreMenuRow label={'비밀번호 변경'} onClick={() => openSideModal(UserPasswordUpdateForm, '비밀번호 변경')} />
          <MoreMenuRow
            label={'로그아웃'}
            onClick={() => onOpenConfirm('로그아웃 하시겠습니까?', () => postAuthLogoutMutation.mutate())}
          />
        </div>
        <div className={'border-border border-t pt-1'}>
          <MoreMenuRow label={'회원 탈퇴'} destructive onClick={handleServiceLeave} />
        </div>
      </MoreMenuContentWrap>
    </section>
  )
}
