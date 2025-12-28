export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main lang="ko" className={'flex h-full w-full bg-white'}>
      <div className={'h-full flex-1 bg-[url("/홍보1.png")] bg-cover bg-center bg-no-repeat'} />
      <div className={'flex h-full w-[730px] flex-col items-center justify-center gap-[30px] overscroll-auto'}>
        <h1 className={'font-pretendard text-gray900 w-[400px] text-[48px] font-bold'}>MyLab</h1>
        {children}
      </div>
    </main>
  )
}
