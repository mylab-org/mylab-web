'use client'
'use no memo'

import { useLabsJoinFormHook } from '../model/use-labs-join-form-hook'
import { LabsJoinPrevInfoModal } from '@/entities/labs'
import { Button } from '@/shared/ui/override/button'
import { Text } from '@/shared/ui/override/text'
import { InputBox } from '@/shared/ui/template/input-box'

type Props = {
  hideTitle?: boolean
  ensureAccessToken?: (options?: { force?: boolean }) => Promise<string>
  onLabFlowSuccess?: () => void
  /** 로그인 온보딩처럼 상위가 확인 모달을 띄울 때 사용 */
  onJoinPrevInfoOpen?: () => void
}

export const LabsJoinForm = ({ hideTitle = false, ensureAccessToken, onLabFlowSuccess, onJoinPrevInfoOpen }: Props) => {
  const { code, register, onSubmit, errors, isPending, isJoinPrevInfoModalOpen, setIsJoinPrevInfoModalOpen } =
    useLabsJoinFormHook({ ensureAccessToken, onJoinPrevInfoOpen })

  return (
    <>
      {!onJoinPrevInfoOpen && (
        <LabsJoinPrevInfoModal
          open={isJoinPrevInfoModalOpen}
          onOpenChange={setIsJoinPrevInfoModalOpen}
          onEnterLab={onLabFlowSuccess}
        />
      )}
      {!hideTitle && (
        <Text className={'text-[24px] font-bold whitespace-pre-wrap'}>{'김땡땡 님,\n연구실에 참여하세요'}</Text>
      )}
      <form id={'join-lab-form'} className={'flex w-full flex-1 flex-col gap-5'} onSubmit={onSubmit}>
        <InputBox
          labelName={'초대코드'}
          placeholder={'초대코드를 입력하세요'}
          {...register('code')}
          isError={!!errors.code}
          errorMsg={errors.code?.message}
        />
        <Button
          type="submit"
          form={'join-lab-form'}
          color={errors.code ? 'error' : code.length === 6 ? 'main' : 'none'}
          disabled={code.length !== 6 || isPending}
          className="group flex w-full transform py-5 transition-all duration-300 hover:bg-gray-900 active:scale-[0.98]"
          icon={
            <svg
              className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          }
          iconPosition={'after'}
        >
          연구실 참여하기
        </Button>
      </form>
    </>
  )
}
