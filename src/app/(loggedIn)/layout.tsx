import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { headers } from 'next/headers'
import { getUsersMeServer } from '@/entities/user/api/get-users-me-server'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { SideWrapper } from '@/shared/ui/template/side-wrapper'
import { PageFooter } from '@/widgets/layout/footer'
import { MobileHeader, PcHeader } from '@/widgets/layout/header'
import { MobileBottomBar, PageGnb } from '@/widgets/layout/menu'

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.USERS.ROOT,
    queryFn: getUsersMeServer,
  })

  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className={'flex w-full flex-1 flex-col overflow-auto bg-[#f9f9f9] pb-[75px]'}>
          <MobileHeader />
          <main className={'scrollbar-hidden flex flex-1 flex-col gap-[10px] pb-[20px]'}>{children}</main>
          <PageFooter />
          <SideWrapper />
        </div>
        <MobileBottomBar />
      </HydrationBoundary>
    )
  } else {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PageGnb />
        <div className={'relative flex flex-1 flex-col gap-[20px] bg-[#f9f9f9] py-[30px] pr-[20px] pl-[100px]'}>
          <PcHeader />
          {children}
          <PageFooter />
          <SideWrapper />
        </div>
      </HydrationBoundary>
    )
  }
}
