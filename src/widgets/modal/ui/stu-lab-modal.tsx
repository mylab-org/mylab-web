'use client'

import { useEffect } from 'react'
import { useModalStore } from '@/shared/store'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { InputBox } from '@/shared/ui/input-box'
import { Text } from '@/shared/ui/text'

export const StuLabModal = () => {
  const setModal = useModalStore(state => state.setModal)

  useEffect(() => {
    return () => setModal('isStuModal', false)
  }, [])

  return (
    <section className={'absolute inset-0 z-1100 flex h-full w-full items-center justify-center bg-gray-300'}>
      <div className={'flex max-w-[500px] flex-col gap-7.5 rounded-[24px] bg-white px-10 py-16 shadow-lg'}>
        <Text className={'text-[24px] font-semibold whitespace-pre-wrap'}>{'참여 전,\n연구실을 다시 확인하세요'}</Text>
        {/*<div>*/}
        {/*  <Text className={'text-[14px] font-medium'}>학교 이름</Text>*/}
        {/*  <Input type={'text'} className={'w-full'} readOnly={true} />*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  <Text className={'text-[14px] font-medium'}>학과 이름</Text>*/}
        {/*  <Input type={'text'} className={'w-full'} readOnly={true} />*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  <Text className={'text-[14px] font-medium'}>연구실 이름</Text>*/}
        {/*  <Input type={'text'} className={'w-full'} readOnly={true} />*/}
        {/*</div>*/}
        <InputBox labelName={'학교명'} readOnly={true} />
        <InputBox labelName={'학과명'} readOnly={true} />
        <InputBox labelName={'연구실명'} readOnly={true} />
        <Button>연구실 참여하기</Button>
      </div>
    </section>
  )
}
