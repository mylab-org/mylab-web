'use client'

import { useState } from 'react'
import { Button, FloatingLabel, IconInput, P } from '@/shared/ui'

export const InviteLab = () => {
  const [isCopy, setIsCopy] = useState<boolean>(false)
  const handleCopy = () => {
    navigator.clipboard.writeText('copy')
    setIsCopy(true)
  }
  return (
    <>
      <P className={'text-[32px] font-semibold whitespace-pre-wrap'}>{'김땡땡 님,\n연구실이 생성되었습니다'}</P>
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
          <P className={'!text-success text-[12px]'}>초대코드가 복사되었습니다</P>
        ) : (
          <P className={'text-[12px]'}>초대코드는 24시간동안 유효합니다</P>
        )}
      </form>
      <Button variant={'primary'}>연구실 입장하기</Button>
    </>
  )
}
