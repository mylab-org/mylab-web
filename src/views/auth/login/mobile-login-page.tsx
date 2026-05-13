'use client'

import { Image } from 'next/dist/client/image-component'
import { useState } from 'react'
import { NewLoginForm } from '@/features/auth/login'
import { Button } from '@/shared/ui/button'
import { AuthLinkItem } from '@/widgets/auth'
import { MobileAuthHeader } from '@/widgets/header'

export const MobileLoginPage = () => {
  const [isLogin, setIsLogin] = useState(false)
  return isLogin ? (
    <>
      {/*<header className={'h-[60px] px-4 py-2.5'}>*/}
      {/*  <Image*/}
      {/*    src={'/icon/move.svg'}*/}
      {/*    alt={'prev'}*/}
      {/*    width={24}*/}
      {/*    height={24}*/}
      {/*    className={'rotate-180'}*/}
      {/*    onClick={() => setIsLogin(false)}*/}
      {/*  />*/}
      {/*</header>*/}
      <MobileAuthHeader isPrev onPrev={() => setIsLogin(false)} />
      <div className={'flex flex-1 flex-col gap-7.5 px-7.5 pb-5'}>
        <h1 className={'text-[22px] font-bold'}>로그인하기</h1>
        <div className={'flex flex-1 flex-col gap-[30px]'}>
          <NewLoginForm />
          <div className={'mt-3 space-y-3'}>
            <AuthLinkItem title={'회원가입하러 가기'} text={'MyLab이 처음이신가요?'} href={'/signup'} />
            <AuthLinkItem title={'비밀번호 재설정하기'} text={'비밀번호를 잊으셨나요?'} href={'#'} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className={'flex flex-1 flex-col gap-7.5 px-7.5 pb-5'}>
      <div className={'flex flex-1 flex-col items-center justify-center'}>
        <Image src={'/MyLab_Logo.png'} alt={'MyLab'} width={60} height={60} />
        <span className="text-[30px] font-bold text-gray-900">
          My<b className={'text-[#2562CD]'}>Lab</b>
        </span>
        <span className="text-[15px] font-semibold text-gray-900">내 손안의 작은 연구실</span>
      </div>
      <Button onClick={() => setIsLogin(true)}>로그인</Button>
    </div>
  )
}
