import { useFormContext } from 'react-hook-form'
import type { Regist } from '@/features/auth/regist/model/types'
import { Button } from '@/shared/ui/button'
import { InputBox } from '@/shared/ui/input-box'

export const NewSignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<Regist>()

  const onSubmit = (data: Regist) => {
    console.log('제출', data)
  }

  return (
    <form id={'signup-form'} onSubmit={handleSubmit(onSubmit)} className={'flex w-full flex-col gap-5'}>
      <InputBox labelName={'이름'} placeholder={'이름을 입력하세요'} />
      <InputBox labelName={'이메일'} placeholder={'이메일을 입력하세요'} />
      <InputBox type={'password'} labelName={'비밀번호'} placeholder={'비밀번호를 입력하세요'} />
      <InputBox type={'password'} labelName={'비밀번호 확인'} placeholder={'비밀번호를 다시 입력하세요'} />
      {/*<div className="group relative">*/}
      {/*  <label*/}
      {/*    htmlFor="id"*/}
      {/*    className="group-focus-within:text-main absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase transition-colors"*/}
      {/*  >*/}
      {/*    이름*/}
      {/*  </label>*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    {...register('username')}*/}
      {/*    placeholder="이름을 입력하세요"*/}
      {/*    className="focus:border-main w-full rounded-2xl border-2 border-gray-100 px-5 py-4.5 text-sm font-medium transition-all outline-none placeholder:text-gray-300 focus:ring-0"*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div className="group relative">*/}
      {/*  <label*/}
      {/*    htmlFor="id"*/}
      {/*    className="group-focus-within:text-main absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase transition-colors"*/}
      {/*  >*/}
      {/*    이메일*/}
      {/*  </label>*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    id="id"*/}
      {/*    name="id"*/}
      {/*    placeholder="사용하실 이메일을 입력하세요"*/}
      {/*    className="focus:border-main w-full rounded-2xl border-2 border-gray-100 px-5 py-4.5 text-sm font-medium transition-all outline-none placeholder:text-gray-300 focus:ring-0"*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div className="group relative">*/}
      {/*  <label*/}
      {/*    htmlFor="id"*/}
      {/*    className="group-focus-within:text-main absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase transition-colors"*/}
      {/*  >*/}
      {/*    비밀번호*/}
      {/*  </label>*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    id="id"*/}
      {/*    name="id"*/}
      {/*    placeholder="비밀번호를 입력해주세요"*/}
      {/*    className="focus:border-main w-full rounded-2xl border-2 border-gray-100 px-5 py-4.5 text-sm font-medium transition-all outline-none placeholder:text-gray-300 focus:ring-0"*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div className="group relative">*/}
      {/*  <label*/}
      {/*    htmlFor="id"*/}
      {/*    className="group-focus-within:text-main absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase transition-colors"*/}
      {/*  >*/}
      {/*    비밀번호 확인*/}
      {/*  </label>*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    id="id"*/}
      {/*    name="id"*/}
      {/*    placeholder="비밀번호를 재입력해주세요"*/}
      {/*    className="focus:border-main w-full rounded-2xl border-2 border-gray-100 px-5 py-4.5 text-sm font-medium transition-all outline-none placeholder:text-gray-300 focus:ring-0"*/}
      {/*  />*/}
      {/*</div>*/}
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
