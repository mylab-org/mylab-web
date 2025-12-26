import { type NextRequest, NextResponse } from 'next/server'

const matchersForAuthUser = ['/']
const matchersForSignIn = ['/login/*', '/regist/*']

function isMatch(pathname: string, urls: string[]) {
  return urls.map(url => pathname.startsWith(url.replace('/*', '')))
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  return NextResponse.next()
}
