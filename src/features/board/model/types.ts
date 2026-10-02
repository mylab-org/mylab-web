export type PostBoardCreatePayloadType = {
  title: string
  content: string
  Img: string[]
  isAnonymous: boolean
}

export type PatchBoardUpdatePayloadType = {
  title: string
  content: string
  Img: string[]
  isAnonymous: boolean
}
