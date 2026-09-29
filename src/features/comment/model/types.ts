export type PostCommentCreatePayloadType = {
  parentId: number
  content: string
}

/** 대댓글 작성 대상 — parentId: 최상위 댓글 id, name: 태깅할 작성자 이름 */
export type CommentReplyTargetType = {
  parentId: number
  name: string
}

export type PatchCommentUpdatePayloadType = {
  parentId: number
  content: string
}
