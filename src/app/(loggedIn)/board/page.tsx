import { headers } from 'next/headers'
import { BoardPage, MobileBoardPage } from '@/views/(loggedIn)/board'

export default async function Board() {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) {
    return <MobileBoardPage />
  } else {
    return <BoardPage />
  }
}
