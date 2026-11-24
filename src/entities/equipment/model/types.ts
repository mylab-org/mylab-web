export type EquipmentRequestStatusType = 'PENDING' | 'APPROVED' | 'REJECTED'

export type RentalResponseType = {
  rentalId: number
  equipmentId: number
  equipmentName: string
  userId: number
  userName: string
  startAt: string
  endAt: string
}

export type EquipmentResponseType = {
  equipmentId: number
  name: string
  imageUrl: string | null
  isRentable: boolean
  rentals: RentalResponseType[]
}

export type EquipmentRequestResponseType = {
  requestId: number
  name: string
  price: number
  quantity: number
  purchaseLink: string | null
  status: EquipmentRequestStatusType
  requesterId: number
  requesterName: string
  reviewedAt: string | null
  createdAt: string
}
