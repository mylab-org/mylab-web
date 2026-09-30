export type BoardCategoryItemType = {
  category_id: string
  category_name: string
}

export type BoardCategoryResponseType = {
  service: BoardCategoryItemType[]
  lab: BoardCategoryItemType[]
}

export type AuthorType = {
  uid: number
  name: string
  degree: UserDegreeType
  labId: number
  labName: string
}

export type PostType = {
  id: number
  title: string
  content: string
  createdAt: string
  author: AuthorType
  likeCount: number
  isLiked: boolean
  isAnonymous: boolean
  isMine: boolean
  commentCount: number
}

export type BoardListResponseType = {
  posts: PostType[]
  page: PageType
}
