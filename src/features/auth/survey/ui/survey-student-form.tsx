import { Button, Input, P } from '@/shared/ui'

export const StudentForm = () => {
  return (
    <>
      <P className={'text-[32px] font-semibold whitespace-pre-wrap'}>{'김땡땡 님,\n연구실에 참여하세요'}</P>
      <form id={'join-lab-form'} action="" className={'flex w-[400px] flex-col gap-[20px]'}>
        <Input type={'text'} className={'w-full'} placeholder={'초대코드'} />
      </form>
      <Button form={'join-lab-form'} variant={'noActive'}>
        연구실 참여하기
      </Button>
    </>
  )
}
