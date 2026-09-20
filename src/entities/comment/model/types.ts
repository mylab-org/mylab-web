export type CommentListResponseType = {
  id: number
  content: string
  created_at: string
  author: {
    name: string
  }
  replies: string[]
}
