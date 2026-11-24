import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { EquipmentResponseType } from '../model/types'

export const getEquipments = async (labId: number) => {
  const response = await axiosGet<ApiResponseType<EquipmentResponseType[]>>(ENDPOINTS.EQUIPMENT.ROOT(labId))

  return response.data
}
