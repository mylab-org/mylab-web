'use client'

import { useState } from 'react'
import { Button, Input, P } from '@/shared/ui'
import { StuLabModal } from '@/widgets/modal'

export const StudentForm = () => {
  const [hasCode, setHasCode] = useState<boolean>(false)
  return (
    <>
      {/*<StuLabModal />*/}
      <P className={'text-[32px] font-semibold whitespace-pre-wrap'}>{'김땡땡 님,\n연구실에 참여하세요'}</P>
      <form id={'join-lab-form'} action="" className={'flex w-[400px] flex-col gap-[20px]'}>
        <Input
          type={'text'}
          className={'w-full'}
          placeholder={'초대코드'}
          onChange={e => setHasCode(e.target.value.trim().length > 0)}
        />
      </form>
      <Button form={'join-lab-form'} variant={hasCode ? 'primary' : 'noActive'}>
        연구실 참여하기
      </Button>
    </>
  )
}
