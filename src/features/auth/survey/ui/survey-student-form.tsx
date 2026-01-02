'use client'

import { useState } from 'react'
import { useModalStore } from '@/shared/store'
import { Button, FloatingLabel, P } from '@/shared/ui'
import { StuLabModal } from '@/widgets/modal'

export const StudentForm = () => {
  const isStuModal = useModalStore(state => state.isStuModal)
  const [hasCode, setHasCode] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)

  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()

    setHasCode(value.length > 0)

    if (hasError) {
      setHasError(false)
    }
  }

  return (
    <>
      {isStuModal && <StuLabModal />}
      <P className={'text-[32px] font-semibold whitespace-pre-wrap'}>{'김땡땡 님,\n연구실에 참여하세요'}</P>
      <form id={'join-lab-form'} action="" className={'flex w-[400px] flex-col gap-[20px]'}>
        <FloatingLabel
          isError={hasError}
          labelName={'초대코드'}
          name={'code'}
          onChange={handleChangeCode}
          errorMsg={'초대코드를 다시 확인해주세요'}
        />
      </form>
      {/*<Button form={'join-lab-form'} variant={hasError ? 'error' : hasCode ? 'primary' : 'noActive'}>*/}
      {/*  연구실 참여하기*/}
      {/*</Button>*/}
      <Button variant={hasError ? 'error' : hasCode ? 'primary' : 'noActive'} onClick={() => setHasError(true)}>
        연구실 참여하기
      </Button>
    </>
  )
}
