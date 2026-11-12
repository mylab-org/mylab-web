import { serverGet } from '@/shared/api/api-server'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { CalendarScheduleResponseType } from '../model/types'

export const getCalendarRangeServer = async (labId: number, from: string, to: string) => {
  const response = await serverGet<ApiResponseType<CalendarScheduleResponseType[]>>(ENDPOINTS.CALENDAR.ROOT(labId), {
    params: { from, to },
  })

  return response.data
}
