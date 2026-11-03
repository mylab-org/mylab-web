'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { MoreLabMember } from './side/more-lab-member'
import { MoreLabUpdate } from './side/more-lab-update'
import { LabInfo } from '@/entities/labs'
import { getLabsMembers } from '@/entities/labs/api/get-labs-members'
import { useUsersMeHook } from '@/entities/user'
import { deleteLabsRevokeInviteCodes } from '@/features/labs/api/delete-labs-revoke-invite-codes'
import { postLabsInviteCodes } from '@/features/labs/api/post-labs-invite-codes'
import type { PostLabsInviteCodesResponseType } from '@/features/labs/model/types'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { DIALOG_MAP } from '@/shared/constant/dialog'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { isProfessorOrLabLeader } from '@/shared/lib/lab'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import { useDialogStore, useSideModalStore } from '@/shared/store'
import { Button } from '@/shared/ui/override/button'
import { Text } from '@/shared/ui/override/text'
import { IconInput } from '@/shared/ui/template/icon-input'
import { MoreMenuContentWrap } from '@/shared/ui/template/more-menu-content-wrap'

interface WrapProps {
  isMobile?: boolean
}

export const MoreLabSection = ({ isMobile = false }: WrapProps) => {
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const openDialogModal = useDialogStore(state => state.openDialogModal)

  const [labInviteCode, setLabInviteCode] = useState<string | null>(null)

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.success('초대코드가 복사되었습니다', { icon: false })
  }

  const handleLabDelete = () => {
    openDialogModal(DIALOG_MAP['LAB_DELETE'], '연구실 삭제', () => {
      console.log('연구실 삭제')
    })
  }

  const { me } = useUsersMeHook()

  const labId = me?.lab?.labId

  const { data: members } = useQuery({
    queryKey: QUERY_KEYS.LABS.MEMBERS(labId ?? 0),
    queryFn: () => getLabsMembers(labId ?? 0),
    enabled: !!labId,
  })

  const deleteLabsRevokeInviteCodesMutation = useApiMutation({
    mutationFn: (code: string) => deleteLabsRevokeInviteCodes(labId ?? 0, code),
    onSuccess: () => setLabInviteCode(null),
    successMessage: '초대코드가 비활성화되었습니다',
  })

  const postLabsInviteCodesMutation = useApiMutation({
    mutationFn: () => postLabsInviteCodes(labId ?? 0, {}),
    onSuccess: (data: PostLabsInviteCodesResponseType) => setLabInviteCode(data.code),
    successMessage: '초대코드가 생성되었습니다',
  })

  const handleDeleteLabsRevokeInviteCodes = () => {
    if (labInviteCode) {
      deleteLabsRevokeInviteCodesMutation.mutate(labInviteCode)
    }
  }

  const handlePostLabsInviteCodes = () => {
    postLabsInviteCodesMutation.mutate()
  }

  if (labId === undefined || members === undefined) return null

  return (
    <section className={'flex w-full flex-col gap-3'}>
      <div className={cn('bg-card flex flex-col gap-3 rounded-[20px]', CARD_SHADOW, isMobile ? 'p-4' : 'p-5')}>
        <LabInfo />
        <Button
          className={'text-[13px]! md:text-[15px]!'}
          onClick={() => openSideModal(MoreLabUpdate, '연구실 정보 수정')}
        >
          수정하기
        </Button>
        {me?.lab.role === 'PROFESSOR' && (
          <Button
            color={'none'}
            className={
              'text-error! border-border bg-card! hover:bg-muted! border text-[13px]! font-semibold md:text-[15px]!'
            }
            onClick={handleLabDelete}
          >
            연구실 삭제
          </Button>
        )}
      </div>

      {isProfessorOrLabLeader(me?.lab.role as UserRoleType) && (
        <MoreMenuContentWrap title={'연구실 초대코드'} isMobile={isMobile}>
          <div className={'flex flex-col gap-2.5'}>
            {labInviteCode ? (
              <IconInput
                value={labInviteCode}
                readOnly
                onClick={() => handleCopy(labInviteCode)}
                className={'cursor-pointer'}
              />
            ) : (
              <Text className={'text-subtle-foreground! text-[13px] font-medium'}>
                아직 생성된 초대코드가 없습니다. 새 코드를 만들어 멤버를 초대하세요.
              </Text>
            )}
            <div className={'flex gap-2.5'}>
              <Button
                className={
                  'border-border bg-card! text-foreground! flex w-full items-center justify-center border text-[13px]! md:text-[14px]!'
                }
                disabled={!labInviteCode || deleteLabsRevokeInviteCodesMutation.isPending}
                onClick={handleDeleteLabsRevokeInviteCodes}
              >
                코드 비활성화
              </Button>
              <Button
                className={
                  'border-brand/30 bg-brand/5! text-brand! flex w-full items-center justify-center border text-[13px]! md:text-[14px]!'
                }
                disabled={postLabsInviteCodesMutation.isPending}
                onClick={handlePostLabsInviteCodes}
              >
                새 코드 생성
              </Button>
            </div>
          </div>
        </MoreMenuContentWrap>
      )}

      <MoreMenuContentWrap title={'연구원 관리'} isMobile={isMobile}>
        <Text className={'text-muted-foreground! text-[12px] font-medium whitespace-pre-wrap md:text-[14px]'}>
          {`연구실에 가입된 인원들을 관리할 수 있어요.\n랩장 권한 설정, 학적 변경이 가능합니다.`}
        </Text>
        <Button
          className={
            'border-brand/30 bg-brand/5! text-brand! flex items-center justify-center gap-2 border text-[13px]! md:text-[14px]!'
          }
          onClick={() =>
            openSideModal(() => <MoreLabMember role={me?.lab.role as UserRoleType} labId={labId} />, '연구원 관리')
          }
        >
          {members.length >= 2 && (
            <div className={'flex items-center gap-1'}>
              <div className={'flex items-center'}>
                <div className={'bg-muted h-4 w-4 rounded-full border border-white md:h-5 md:w-5'} />
                <div className={'bg-muted -ml-2 h-4 w-4 rounded-full border border-white md:-ml-2.5 md:h-5 md:w-5'} />
                <div className={'bg-muted -ml-2 h-4 w-4 rounded-full border border-white md:-ml-2.5 md:h-5 md:w-5'} />
              </div>
              <span className={'text-[12px] font-bold'}>{members.length >= 4 ? `+${members.length - 3}` : ''}</span>
            </div>
          )}
          연구원 전체 보기 · {members.length}명
        </Button>
      </MoreMenuContentWrap>
    </section>
  )
}
