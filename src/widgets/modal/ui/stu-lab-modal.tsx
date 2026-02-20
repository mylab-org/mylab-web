'use client'

import { useEffect } from 'react'
import { useModalStore } from '@/shared/store'
import { Button, Input, Text } from '@/shared/ui'

export const StuLabModal = () => {
  const setModal = useModalStore(state => state.setModal)

  useEffect(() => {
    return () => setModal('isStuModal', false)
  }, [])

  return (
    <section className={'absolute inset-0 z-[1100] flex h-full w-full items-center justify-center bg-black/10'}>
      <div className={'flex flex-col gap-[30px] rounded-[24px] bg-white px-[40px] py-[64px] shadow-lg'}>
        <Text className={'text-[32px] font-semibold whitespace-pre-wrap'}>{'참여 전,\n연구실을 다시 확인하세요'}</Text>
        <div>
          <Text className={'text-[14px] font-medium'}>학교 이름</Text>
          <Input type={'text'} className={'w-full'} readOnly={true} />
        </div>
        <div>
          <Text className={'text-[14px] font-medium'}>학과 이름</Text>
          <Input type={'text'} className={'w-full'} readOnly={true} />
        </div>
        <div>
          <Text className={'text-[14px] font-medium'}>연구실 이름</Text>
          <Input type={'text'} className={'w-full'} readOnly={true} />
        </div>
        <Button variant={'primary'}>연구실 참여하기</Button>
      </div>
    </section>
  )
}
