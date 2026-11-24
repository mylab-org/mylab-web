'use client'

import { useQuery } from '@tanstack/react-query'
import { getEquipmentRequests } from '../api/get-equipment-requests'
import { getEquipments } from '../api/get-equipments'
import { getMyEquipmentRequests } from '../api/get-my-equipment-requests'
import { getMyRentalHistory } from '../api/get-my-rental-history'
import { getMyRentals } from '../api/get-my-rentals'
import { useUsersMeHook } from '@/entities/user'
import { QUERY_KEYS } from '@/shared/api/query-key'
import type { EquipmentRequestStatusType } from './types'

/** 연구실 비품 목록 */
export const useEquipmentListHook = () => {
  const { lab } = useUsersMeHook()
  const labId = lab?.labId

  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.EQUIPMENT.LIST(labId ?? 0),
    queryFn: () => getEquipments(labId as number),
    enabled: labId !== undefined,
  })

  return { labId, equipments: data ?? [], isPending }
}

/** 내 비품 대여 내역 */
export const useMyRentalsHook = () => {
  const { lab } = useUsersMeHook()
  const labId = lab?.labId

  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.EQUIPMENT.MY_RENTALS(labId ?? 0),
    queryFn: () => getMyRentals(labId as number),
    enabled: labId !== undefined,
  })

  return { labId, rentals: data ?? [], isPending }
}

/** 지난 대여까지 포함한 내 비품 대여 내역 */
export const useMyRentalHistoryHook = () => {
  const { lab } = useUsersMeHook()
  const labId = lab?.labId

  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.EQUIPMENT.MY_RENTAL_HISTORY(labId ?? 0),
    queryFn: () => getMyRentalHistory(labId as number),
    enabled: labId !== undefined,
  })

  return { labId, rentals: data ?? [], isPending }
}

/** 비품 구매 신청 목록. 서버가 역할에 따라 전체 또는 본인 것만 내려준다 */
export const useEquipmentRequestsHook = (status?: EquipmentRequestStatusType) => {
  const { lab } = useUsersMeHook()
  const labId = lab?.labId

  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.EQUIPMENT.REQUESTS(labId ?? 0, status),
    queryFn: () => getEquipmentRequests(labId as number, status),
    enabled: labId !== undefined,
  })

  return { labId, requests: data ?? [], isPending }
}

/** 내가 올린 구매 신청만 */
export const useMyEquipmentRequestsHook = (status?: EquipmentRequestStatusType) => {
  const { lab } = useUsersMeHook()
  const labId = lab?.labId

  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.EQUIPMENT.MY_REQUESTS(labId ?? 0, status),
    queryFn: () => getMyEquipmentRequests(labId as number, status),
    enabled: labId !== undefined,
  })

  return { requests: data ?? [], isPending }
}
