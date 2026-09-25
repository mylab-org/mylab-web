'use client'
'use no memo'

import { LabsCreateResponseModal } from './labs-create-response-modal'
import { useLabsCreateFormHook } from '../model/use-labs-create-form-hook'
import { Button } from '@/shared/ui/override/button'
import { Text } from '@/shared/ui/override/text'
import { InputBox } from '@/shared/ui/template/input-box'
import type { PostLabsCreateResponseType } from '../model/types'

type Props = {
  hideTitle?: boolean
  ensureAccessToken?: (options?: { force?: boolean }) => Promise<string>
  onLabFlowSuccess?: () => void
  /** 로그인 온보딩처럼 상위가 결과 모달을 띄울 때 사용 */
  onCreateSuccess?: (data: PostLabsCreateResponseType) => void
}

export const LabsCreateForm = ({ hideTitle = false, ensureAccessToken, onLabFlowSuccess, onCreateSuccess }: Props) => {
  const { register, isValid, isPending, onSubmit, createLabResponse, clearCreateLabResponse } = useLabsCreateFormHook({
    ensureAccessToken,
    onCreateSuccess,
  })

  return (
    <>
      {!onCreateSuccess && (
        <LabsCreateResponseModal
          open={createLabResponse !== null}
          createLabResponse={createLabResponse}
          onEnterLab={onLabFlowSuccess}
          onOpenChange={open => {
            if (!open) {
              clearCreateLabResponse()
            }
          }}
        />
      )}
      {!hideTitle && (
        <Text className={'text-[24px] font-bold whitespace-pre-wrap'}>{'김땡땡 님,\n연구실을 생성하세요'}</Text>
      )}
      <form className={'flex h-full w-full flex-col gap-5'}>
        <Text className={'text-[14px] font-semibold'}>연구실 검토는 평균 2일 이내에 처리됩니다.</Text>
        <InputBox
          labelName={'학교명'}
          {...register('universityName', { required: true })}
          placeholder={'학교명을 입력하세요'}
        />
        <InputBox
          labelName={'학과명'}
          {...register('departmentName', { required: true })}
          placeholder={'학과명을 입력하세요'}
        />
        <InputBox
          labelName={'연구실명'}
          {...register('labName', { required: true })}
          placeholder={'연구실명을 입력하세요'}
        />
        <Button
          disabled={!isValid || isPending}
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
          onClick={onSubmit}
        >
          연구실 참여하기
        </Button>
      </form>
    </>
  )
}
