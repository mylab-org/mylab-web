import { EMAIL_VALIDATE_ACCESS_COOKIE_KEY, EMAIL_VALIDATE_ACCESS_STORAGE_KEY } from '@/shared/constant/auth'
import type { NextRequest } from 'next/server'

export type EmailValidateAccessPayload = {
  email: string
  name?: string
}

type CookieReader = {
  get: (name: string) => { value?: string } | undefined
}

type RequestLikeWithCookies = {
  cookies: CookieReader
}

export function hasEmailValidateAccessFromRequest(request: NextRequest | RequestLikeWithCookies) {
  return request.cookies.get(EMAIL_VALIDATE_ACCESS_COOKIE_KEY)?.value === '1'
}

export function allowEmailValidateAccess(payload: EmailValidateAccessPayload) {
  if (typeof window === 'undefined') return

  sessionStorage.setItem(EMAIL_VALIDATE_ACCESS_STORAGE_KEY, JSON.stringify(payload))
  document.cookie = `${EMAIL_VALIDATE_ACCESS_COOKIE_KEY}=1; Path=/; Max-Age=3600; SameSite=Lax`
}

export function clearEmailValidateAccess() {
  if (typeof window === 'undefined') return

  sessionStorage.removeItem(EMAIL_VALIDATE_ACCESS_STORAGE_KEY)
  document.cookie = `${EMAIL_VALIDATE_ACCESS_COOKIE_KEY}=; Path=/; Max-Age=0; SameSite=Lax`
}

export function getEmailValidateAccessPayload(): EmailValidateAccessPayload | null {
  if (typeof window === 'undefined') return null

  const raw = sessionStorage.getItem(EMAIL_VALIDATE_ACCESS_STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as EmailValidateAccessPayload
  } catch {
    return null
  }
}
