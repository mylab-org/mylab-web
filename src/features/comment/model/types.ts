export type PostCommentCreatePayloadType = {
  parentId: number
  content: string
}

export type PatchCommentUpdatePayloadType = {
  parentId: number
  content: string
}
