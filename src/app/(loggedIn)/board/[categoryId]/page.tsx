import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { BoardPage, MobileBoardPage } from '@/views/(loggedIn)/board'

type BoardCategoryProps = {
  params: Promise<{ categoryId: string }>
}

export default async function BoardCategory({ params }: BoardCategoryProps) {
  const { categoryId: rawCategoryId } = await params
  const categoryId = Number(rawCategoryId)
  if (!Number.isInteger(categoryId)) notFound()

  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) {
    return <MobileBoardPage categoryId={categoryId} />
  } else {
    return <BoardPage categoryId={categoryId} />
  }
}
