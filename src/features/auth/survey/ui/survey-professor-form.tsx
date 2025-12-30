import { Button, Input, P } from '@/shared/ui'

export const ProfessorForm = () => {
  return (
    <>
      <P className={'text-[32px] font-semibold whitespace-pre-wrap'}>{'김땡땡 님,\n연구실을 생성하세요'}</P>
      <form id={'create-lab-form'} action="" className={'flex w-[400px] flex-col gap-[20px]'}>
        <Input type={'text'} className={'w-full'} placeholder={'학교 이름'} />
        <Input type={'text'} className={'w-full'} placeholder={'학과 이름'} />
        <Input type={'text'} className={'w-full'} placeholder={'연구실 이름'} />
      </form>
      <Button form={'create-lab-form'} variant={'noActive'}>
        연구실 생성하기
      </Button>
      <P className={'text-[18px] font-medium'}>교수 인증은 평균 2일 이내에 처리됩니다.</P>
    </>
  )
}
