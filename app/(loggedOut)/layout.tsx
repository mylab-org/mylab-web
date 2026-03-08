import { headers } from 'next/headers'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  // console.log('eee', ua, /Android|iPhone|iPad|iPod|Mobile/i.test(ua))
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) {
    return (
      <main className={'flex w-full flex-1 flex-col items-center justify-center gap-[30px] overscroll-auto bg-white'}>
        <h1 className={'font-pretendard text-gray900 w-[400px] text-[48px] font-bold'}>MyLab</h1>
        {children}
      </main>
    )
  } else {
    return (
      <main className={'flex w-full flex-1 bg-white'}>
        <div className={'h-full flex-1 bg-[url("/MyLab_Logo.png")] bg-center bg-no-repeat'} />
        <div
          className={'relative flex h-full w-[730px] flex-col items-center justify-center gap-[30px] overscroll-auto'}
        >
          <h1 className={'font-pretendard text-gray900 w-[400px] text-[48px] font-bold'}>MyLab</h1>
          {children}
        </div>
      </main>
    )
  }
}
