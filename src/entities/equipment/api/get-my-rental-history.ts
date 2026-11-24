import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { RentalResponseType } from '../model/types'

export const getMyRentalHistory = async (labId: number) => {
  const response = await axiosGet<ApiResponseType<RentalResponseType[]>>(ENDPOINTS.EQUIPMENT.MY_RENTAL_HISTORY(labId))

  return response.data
}
