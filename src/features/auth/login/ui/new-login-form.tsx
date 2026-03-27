import React from 'react'
import { Button } from '@/shared/ui/button'

export const NewLoginForm = () => {
  return (
    <form className="space-y-6" onSubmit={e => e.preventDefault()}>
      <div className="group relative">
        <label
          htmlFor="id"
          className="group-focus-within:text-main absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase transition-colors"
        >
          이메일
        </label>
        <input
          type="text"
          id="id"
          name="id"
          placeholder="학번 또는 아이디를 입력하세요"
          className="focus:border-main w-full rounded-2xl border-2 border-gray-100 px-5 py-4.5 text-sm font-medium transition-all outline-none placeholder:text-gray-300 focus:ring-0"
        />
      </div>

      <div className="group relative">
        <label
          htmlFor="password"
          className="group-focus-within:text-main absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase transition-colors"
        >
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          className="focus:border-main w-full rounded-2xl border-2 border-gray-100 px-5 py-4.5 text-sm font-medium transition-all outline-none placeholder:text-gray-300 focus:ring-0"
        />
      </div>

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
        로그인하기
      </Button>
    </form>
  )
}
