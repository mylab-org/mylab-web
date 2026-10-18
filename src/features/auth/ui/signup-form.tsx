'use client'

import { ArrowRight } from 'lucide-react'
import { useSignupFormHook } from '../model/use-signup-form-hook'
import { Button } from '@/shared/ui/override/button'
import { InputBox } from '@/shared/ui/template/input-box'

export const SignUpForm = () => {
  const { register, onSubmit, isValid } = useSignupFormHook()

  return (
    <form className={'flex w-full flex-col gap-5'}>
      <InputBox labelName={'이름'} placeholder={'이름을 입력하세요'} {...register('name', { required: true })} />
      <InputBox labelName={'이메일'} placeholder={'이메일을 입력하세요'} {...register('email', { required: true })} />
      <InputBox
        type={'password'}
        labelName={'비밀번호'}
        placeholder={'비밀번호를 입력하세요'}
        {...register('password', { required: true })}
      />
      <InputBox
        type={'password'}
        labelName={'비밀번호 확인'}
        placeholder={'비밀번호를 다시 입력하세요'}
        {...register('passwordConfirm', { required: true })}
      />
      <Button
        color="main"
        disabled={!isValid}
        className="group flex w-full transform py-5 transition-all duration-300 hover:bg-gray-900 active:scale-[0.98]"
        onClick={onSubmit}
        icon={
          <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" strokeWidth={3} />
        }
        iconPosition={'after'}
      >
        가입하기
      </Button>
    </form>
  )
}
