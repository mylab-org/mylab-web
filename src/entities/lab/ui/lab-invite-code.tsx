'use client'

import { useState } from 'react'
import { IconInput } from '@/shared/ui/icon-input'
import { Button } from '@/shared/ui/override/button'
import { Text } from '@/shared/ui/text'

export const LabInviteCode = () => {
  const [isCopy, setIsCopy] = useState<boolean>(false)
  const handleCopy = () => {
    navigator.clipboard.writeText('copy')
    setIsCopy(true)
  }
  return (
    <>
      <Text className={'text-[32px] font-semibold whitespace-pre-wrap'}>{'김땡땡 님,\n연구실이 생성되었습니다'}</Text>
      <form>
        <IconInput
          basicSvgName={'/icon/clipboard.svg'}
          effectSvgName={'/icon/success.svg'}
          state={isCopy}
          value={'123456'}
          readOnly
          onClick={handleCopy}
          className={'cursor-pointer'}
        />
        {isCopy ? (
          <Text className={'text-success text-[12px]'}>초대코드가 복사되었습니다</Text>
        ) : (
          <Text className={'text-[12px]'}>초대코드는 24시간동안 유효합니다</Text>
        )}
      </form>
      <Button>연구실 입장하기</Button>
    </>
  )
}
