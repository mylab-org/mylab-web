export type CommentType = {
  cid: number
  content: string
  createdAt: string
  author: {
    name: string
    labName: string
  }
}

export type CommentListResponseType = {
  replies: CommentType[]
} & CommentType
