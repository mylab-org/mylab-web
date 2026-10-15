'use client'
'use no memo'

import { ArrowRight } from 'lucide-react'
import { useLabsJoinFormHook } from '../model/use-labs-join-form-hook'
import type { LabsInviteCodesCheckValidateResponseType } from '@/entities/labs/model/types'
import { Button } from '@/shared/ui/override/button'
import { Text } from '@/shared/ui/override/text'
import { InputBox } from '@/shared/ui/template/input-box'

type Props = {
  /** 로그인 온보딩처럼 상위가 확인 모달을 띄울 때 사용 */
  onJoinPrevInfoOpen?: (code: string, labInfo: LabsInviteCodesCheckValidateResponseType) => void
  userName: string
}

export const LabsJoinForm = ({ onJoinPrevInfoOpen, userName }: Props) => {
  const { code, register, onSubmit, errors, isPending } = useLabsJoinFormHook({ onJoinPrevInfoOpen })

  return (
    <form className={'flex w-full flex-1 flex-col gap-5'}>
      <Text className={'text-[20px] font-bold whitespace-pre-wrap'}>{`${userName} 님,\n연구실에 참여하세요`}</Text>
      <InputBox
        labelName={'초대코드'}
        placeholder={'초대코드를 입력하세요'}
        {...register('code')}
        isError={!!errors.code}
        errorMsg={errors.code?.message}
      />
      <Button
        color={errors.code ? 'error' : code.length === 8 ? 'main' : 'none'}
        disabled={code.length !== 8 || isPending}
        className="group flex w-full transform py-5 transition-all duration-300 active:scale-[0.98]"
        icon={
          <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" strokeWidth={3} />
        }
        iconPosition={'after'}
        onClick={onSubmit}
      >
        연구실 참여하기
      </Button>
    </form>
  )
}
