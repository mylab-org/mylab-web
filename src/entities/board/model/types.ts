export type BoardCategoryItemType = {
  category_id: string
  category_name: string
}

export type BoardCategoryResponseType = {
  service: BoardCategoryItemType[]
  lab: BoardCategoryItemType[]
}

export type AuthorType = {
  id: string
  name: string
  degree: UserDegreeType
}

export type LabType = {
  id: number
  name: string
}

export type PostType = {
  id: string
  title: string
  content: string
  created_at: string
  author: AuthorType
  lab: LabType
  commentCount: number
}

export type BoardListResponseType = {
  posts: PostType[]
  page: PageType
}
