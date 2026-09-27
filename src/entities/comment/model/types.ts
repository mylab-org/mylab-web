export type CommentItemType = {
  id: number
  content: string
  created_at: string
  author: {
    name: string
  }
  replies: CommentItemType[]
}

export type CommentListResponseType = CommentItemType[]
