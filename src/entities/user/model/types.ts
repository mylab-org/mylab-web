export type UsersMeResponseType = {
  id: number
  email: string
  name: string
  degree: UserDegreeType
  is_email_verified: boolean
  created_at: string
  updated_at: string
  lab: {
    labId: number
    labName: string
    role: UserRoleType
  }
}

export type UsersMePostsResponseType = {
  id: number
  categoryId: number
  categoryName: string
  title: string
  content: string
  createdAt: string
  likeCount: number
  commentCount: number
}

export type UsersMePostsListResponseType = {
  posts: UsersMePostsResponseType[]
  page: CursorType
}
