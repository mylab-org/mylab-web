import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { LabScheduleSection } from '../section/lab-schedule-section'
import { getCalendarRangeServer } from '@/entities/calendar/api/get-calendar-range-server'
import { getWeekRange } from '@/entities/calendar/lib/date'
import { getLabsMembersServer } from '@/entities/labs/api/get-labs-members-server'
import { getUsersMeServer } from '@/entities/user/api/get-users-me-server'
import { QUERY_KEYS } from '@/shared/api/query-key'

export const LabScheduleServerSection = async () => {
  const queryClient = new QueryClient()

  const me = await getUsersMeServer().catch(() => null)
  const labId = me?.lab?.labId

  if (labId !== undefined) {
    const { from, to } = getWeekRange(new Date())

    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: QUERY_KEYS.CALENDAR.RANGE(labId, from, to),
        queryFn: () => getCalendarRangeServer(labId, from, to),
      }),
      queryClient.prefetchQuery({
        queryKey: QUERY_KEYS.LABS.MEMBERS(labId),
        queryFn: () => getLabsMembersServer(labId),
      }),
    ])
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LabScheduleSection />
    </HydrationBoundary>
  )
}
