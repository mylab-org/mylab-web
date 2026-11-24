import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { EquipmentRequestResponseType, EquipmentRequestStatusType } from '../model/types'

export const getEquipmentRequests = async (labId: number, status?: EquipmentRequestStatusType) => {
  const response = await axiosGet<ApiResponseType<EquipmentRequestResponseType[]>>(
    ENDPOINTS.EQUIPMENT.REQUESTS(labId),
    {
      params: status ? { status } : undefined,
    },
  )

  return response.data
}
