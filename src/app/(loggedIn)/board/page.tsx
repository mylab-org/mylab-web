import { MobileBoardPage } from '@/views/(loggedIn)/board'

// PC의 /board 접근은 proxy.ts에서 /board/{기본 카테고리}로 리다이렉트되므로,
// 이 페이지에는 모바일(카테고리 목록 화면) 요청만 도달
export default async function Board() {
  return <MobileBoardPage />
}
