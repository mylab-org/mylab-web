'use client'

import { UserInfo, useUsersMeHook } from '@/entities/user'

export const LabWelcomeSection = () => {
  const { me, isError } = useUsersMeHook()

  if (isError || !me) return null

  return <UserInfo user={me} />
}
