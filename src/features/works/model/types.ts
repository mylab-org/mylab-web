export type PostWorksPaperCreatePayloadType = {
  title: string
  scheduleId: number
  leadAuthorUserId: number
  participantUserIds: number[]
}

export type PatchWorksPaperUpdatePayloadType = {
  title: string
  leadAuthorUserId: number
  scheduleId: number
}

export type PatchWorksPaperStatusPayloadType = {
  status: PaperStatusType
}

export type PostWorksPaperAddMemberPayloadType = {
  userId: number
  role: string
}

export type PatchWorksPaperMemberRolePayloadType = {
  role: string
}
