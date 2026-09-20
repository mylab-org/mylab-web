'use client'

import { useSignupFormHook } from '../model/use-signup-form-hook'
import { Button } from '@/shared/ui/override/button'
import { InputBox } from '@/shared/ui/template/input-box'

export const SignUpForm = () => {
  const { register, onSubmit, isValid } = useSignupFormHook()

  return (
    <form id={'signup-form'} onSubmit={onSubmit} className={'flex w-full flex-col gap-5'}>
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
        type="submit"
        color="main"
        disabled={!isValid}
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
        가입하기
      </Button>
    </form>
  )
}
