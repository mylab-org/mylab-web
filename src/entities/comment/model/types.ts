export type CommentType = {
  cid: number
  content: string
  createdAt: string
  author: {
    name: string
    labName: string
  }
  isAnonymous: boolean
  isMine: boolean
}

export type CommentListResponseType = {
  replies: CommentType[]
} & CommentType
