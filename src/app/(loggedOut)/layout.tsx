import { Image } from 'next/dist/client/image-component'
import { headers } from 'next/headers'
import React from 'react'
import { AuthBackground } from '@/shared/ui/auth-background'
import type { Metadata } from 'next'
import LabIcon from '@/../public/icon/icon_gnb_lab.svg'

export const metadata: Metadata = {
  title: 'MyLab',
  description: '나만의 작은 연구실',
}

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) {
    return (
      <main className={'flex w-full flex-col items-center justify-center overscroll-auto bg-white'}>
        <div className={'flex h-full w-full flex-col lg:w-4xl'}>{children}</div>
      </main>
    )
  } else {
    return (
      // <main className={'flex w-full flex-1 bg-white'}>
      //   {/*<div className={'h-full flex-1 bg-[url("/MyLab_Logo.png")] bg-center bg-no-repeat'} />*/}
      //   <div className={'flex flex-1 items-center justify-center'}>
      //     <Image src={'/MyLab_Logo.png'} alt={'MyLab'} width={600} height={600} />
      //   </div>
      //   <div
      //     className={'relative flex h-full w-[730px] flex-col items-center justify-center gap-[30px] overscroll-auto'}
      //   >
      //     <h1 className={'w-[400px] text-[48px] font-bold text-gray-900'}>MyLab</h1>
      //     {children}
      //   </div>
      // </main>
      // <main className={'w-full bg-white'}>{children}</main>
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-[#f9f9f9] p-4">
        <div className="flex min-h-3/4 w-full max-w-6xl flex-col overflow-hidden rounded-[40px] bg-white shadow-[0_40px_100px_-20px_rgba(37,98,205,0.3)] md:flex-row">
          {/* 왼쪽 섹션 */}
          <div className="relative flex flex-col justify-between overflow-hidden p-10 text-white md:w-[45%] md:p-14 md:shadow-2xl">
            <AuthBackground />
            <div className="relative z-10">
              <div className="mb-8 flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-90">System Online</span>
              </div>
              <h1 className="mb-6 text-3xl leading-[1.2] font-extrabold tracking-tight drop-shadow-md md:text-4xl">
                나의 연구실 생활은 <br /> 마이랩과 함께
              </h1>
              <p className="text-base leading-relaxed font-medium text-blue-50 opacity-95 md:text-lg">
                연구 자료, 일정 관리와 같이
                <br />
                마이랩과 함께 연구 생활을
                <br />
                그려나가 보세요!
              </p>
            </div>

            <div className="relative z-10 mt-12">
              <div className="group rounded-[24px] border border-white/20 bg-white/10 p-7 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] backdrop-blur-[15px] transition-all hover:bg-white/25">
                <div className="flex items-center space-x-4">
                  {/* 아이콘 컨테이너 */}
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 transition-transform group-hover:scale-110">
                    <div className={'h-6 w-6 text-white'}>
                      <LabIcon />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">내 손안의 작은 연구실</h4>
                    <p className="mt-1 text-xs text-blue-100/80">연구자료와 커뮤니티 공간을 이용해보세요!</p>
                  </div>
                </div>
                <div className="mt-6 text-center text-[11px] font-medium tracking-wider text-white opacity-70">
                  copyright 2026 © MyLab All rights reserved.
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽 섹션: 로그인 폼 */}
          <div className="flex flex-col justify-center bg-white p-10 md:relative md:w-[55%] md:p-20">
            <div className="mb-14 flex flex-col">
              <div className="mb-2 flex items-center space-x-3">
                <Image src={'/MyLab_Logo.png'} alt={'MyLab'} width={40} height={40} />
                <span className="text-2xl font-black tracking-tighter text-gray-900">
                  My<b className={'text-[#2562CD]'}>Lab</b>
                </span>
              </div>
              <p className="ml-1 flex items-center text-xs font-medium text-gray-600">
                <span className="bg-main mr-2 h-2 w-2 rounded-full" />
                대학 연구실 커뮤니티 플랫폼
              </p>
            </div>
            <div className={'flex-1'}>{children}</div>
          </div>
        </div>
      </main>
    )
  }
}
