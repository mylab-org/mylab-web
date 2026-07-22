import { useFormContext } from 'react-hook-form'
import type { Regist } from '@/features/auth/regist/model/types'
import { InputBox } from '@/shared/ui/input-box'
import { Button } from '@/shared/ui/override/button'

export const NewSignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<Regist>()

  const onSubmit = handleSubmit((data: Regist) => {
    console.log('제출', data)
  })

  return (
    <form id={'signup-form'} onSubmit={onSubmit} className={'flex w-full flex-col gap-5'}>
      <InputBox labelName={'이름'} placeholder={'이름을 입력하세요'} {...register('username')} />
      <InputBox labelName={'이메일'} placeholder={'이메일을 입력하세요'} {...register('email')} />
      <InputBox
        type={'password'}
        labelName={'비밀번호'}
        placeholder={'비밀번호를 입력하세요'}
        {...register('password')}
      />
      <InputBox
        type={'password'}
        labelName={'비밀번호 확인'}
        placeholder={'비밀번호를 다시 입력하세요'}
        {...register('passwordCheck')}
      />
      <Button
        type="submit"
        color={'main'}
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
