import { type NextRequest, NextResponse } from 'next/server'

const matchersForAuthUser = ['/']
const matchersForSignIn = ['/login/*', '/signup/*']

// function parseUserAgent(userAgent: string) {
//   const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
//
//   // 💡 단순히 !isMobile이 아니라, Windows나 Mac 같은 PC 환경인지 직접 확인합니다.
//   const isDesktop = /Windows|Macintosh|Linux/i.test(userAgent) && !isMobile
//
//   return { isMobile, isDesktop }
// }

function isMatch(pathname: string, urls: string[]) {
  return urls.map(url => pathname.startsWith(url.replace('/*', '')))
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // const { pathname, searchParams } = request.nextUrl
  //
  // const userAgent = request.headers.get('user-agent') || ''
  // const device = parseUserAgent(userAgent)
  //
  // //mo 제거 함수 (rental 경로 고려)
  // const getBasePath = (path: string) => {
  //   // mount 경로는 그대로 반환
  //   if (path.startsWith('/mount')) {
  //     return path
  //   } else if (path === '/mo') {
  //     // 추가: 루트 경로 처리
  //     return '/'
  //   } else {
  //     return path.replace('/mo', '')
  //   }
  // }
  //
  // const basePath = getBasePath(pathname)
  //
  // // 현재 경로가 이미 모바일 버전인지 확인
  // const isMobilePath = (path: string) => {
  //   return path.includes('/mo')
  // }
  //
  // // 기본 경로 추출
  //
  // // 디바이스에 따른 경로 변환 함수
  // const getMobilePath = (path: string) => {
  //   return `/mo${path}`
  // }
  //
  // // 디바이스별 경로 리다이렉션
  // // 모바일 디바이스에서 /mo 아닌경로 접근시
  // if (device.isMobile && !isMobilePath(pathname)) {
  //   const mobilePath = getMobilePath(basePath)
  //
  //   // URL 파라미터를 유지하면서 리다이렉션
  //   const newUrl = new URL(mobilePath, request.url)
  //
  //   // 기존 URL의 모든 검색 파라미터를 새 URL에 복사
  //   request.nextUrl.searchParams.forEach((value, key) => {
  //     newUrl.searchParams.set(key, value)
  //   })
  //
  //   return NextResponse.redirect(newUrl)
  // }
  //
  // // 데스크톱 디바이스에서 /mo 경로 접근시
  // if (device.isDesktop && isMobilePath(pathname)) {
  //   const newUrl = new URL(basePath, request.url)
  //
  //   // 기존 URL의 모든 검색 파라미터를 새 URL에 복사
  //   request.nextUrl.searchParams.forEach((value, key) => {
  //     newUrl.searchParams.set(key, value)
  //   })
  //
  //   return NextResponse.redirect(newUrl)
  // }

  return NextResponse.next()
}

// export const config = {
//   matcher: [
//     // 전체 경로 매칭
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// }
