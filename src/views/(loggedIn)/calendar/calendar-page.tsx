import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getCalendarMonthlyServer } from '@/entities/calendar/api/get-calendar-monthly-server'
import { getLabsMembersServer } from '@/entities/labs/api/get-labs-members-server'
import { getUsersMeServer } from '@/entities/user/api/get-users-me-server'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { CalendarBoardSection } from '@/widgets/calendar'

export const CalendarPage = async () => {
  const queryClient = new QueryClient()

  const me = await getUsersMeServer().catch(() => null)
  const labId = me?.lab?.labId

  if (labId !== undefined) {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1

    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: QUERY_KEYS.CALENDAR.MONTHLY(labId, year, month),
        queryFn: () => getCalendarMonthlyServer(labId, year, month),
      }),
      queryClient.prefetchQuery({
        queryKey: QUERY_KEYS.LABS.MEMBERS(labId),
        queryFn: () => getLabsMembersServer(labId),
      }),
    ])
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CalendarBoardSection />
    </HydrationBoundary>
  )
}
