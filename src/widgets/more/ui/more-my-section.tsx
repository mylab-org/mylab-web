'use client'

import { MoreMenuRow } from './more-menu-row'
import { MoreUserUpdate } from './side/more-user-update'
import { useUsersMeHook } from '@/entities/user'
import { UserMoreInfo } from '@/entities/user/ui/user-more-info'
import { useLabsExitMeHook } from '@/features/labs/model/use-labs-exit-me-hook'
import { DIALOG_MAP } from '@/shared/constant/dialog'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { useDialogStore, useSideModalStore } from '@/shared/store'
import { Button } from '@/shared/ui/override/button'
import { MoreMenuContentWrap } from '@/shared/ui/template/more-menu-content-wrap'

type Props = {
  isMobile?: boolean
}

export const MoreMySection = ({ isMobile = false }: Props) => {
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const openDialogModal = useDialogStore(state => state.openDialogModal)
  const { handleExit } = useLabsExitMeHook()

  const handleLabExit = () => {
    openDialogModal(DIALOG_MAP['LAB_EXIT'], '연구실 나가기', handleExit)
  }

  const { me, isError } = useUsersMeHook()

  if (isError || !me) return null

  const canLeaveLab = me.lab.role !== 'PROFESSOR'

  return (
    <section className={'flex w-full flex-col gap-3'}>
      <div className={cn('bg-card flex flex-col gap-3 rounded-[20px]', CARD_SHADOW, isMobile ? 'p-4' : 'p-5')}>
        <UserMoreInfo user={me} />
        <Button
          className={'text-[13px]! md:text-[15px]!'}
          onClick={() => openSideModal(MoreUserUpdate, '내 정보 수정')}
        >
          내 정보 수정
        </Button>
      </div>
      <MoreMenuContentWrap title={'나의 활동'} isMobile={isMobile}>
        <div className={'flex flex-col gap-1'}>
          <MoreMenuRow label={'내 비품 대여 내역'} upcoming />
          <MoreMenuRow label={'내 비품 신청 내역'} upcoming />
          <MoreMenuRow label={'내가 작성한 글 확인'} upcoming />
          <MoreMenuRow label={'내가 작성한 댓글 확인'} upcoming />
        </div>
        {canLeaveLab && (
          <div className={'border-border border-t pt-1'}>
            <MoreMenuRow label={'연구실 나가기'} destructive onClick={handleLabExit} />
          </div>
        )}
      </MoreMenuContentWrap>
    </section>
  )
}
