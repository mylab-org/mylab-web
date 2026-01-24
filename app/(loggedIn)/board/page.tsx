import { headers } from 'next/headers'
import { BoardPage } from '@/views/board'

export default async function Board() {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) {
    return <BoardPage />
  } else {
    return <BoardPage />
  }
}
