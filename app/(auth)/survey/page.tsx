import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { LinkText } from '@/shared/ui/link-text'
import { P } from '@/shared/ui/p'
import { Radio } from '@/shared/ui/radio'

const AuthServey = () => {
  return (
    <div className={'flex flex-col gap-[20px]'}>
      {/*<P className={'text-[32px] font-semibold whitespace-pre-wrap'}>{'김땡땡 님,\n연구실을 생성하세요'}</P>*/}
      {/*<div className={'flex gap-[20px]'}>*/}
      {/*  <Radio id={'survey1'} name={'survey'} title={'교수'} />*/}
      {/*  <Radio id={'survey2'} name={'survey'} title={'연구원'} />*/}
      {/*</div>*/}
      {/*<form id={'create-lab-form'} action="" className={'flex w-[400px] flex-col gap-[20px]'}>*/}
      {/*  <div>*/}
      {/*    <div className={'flex gap-[6px]'}>*/}
      {/*      <Input type={'text'} className={'flex-1'} placeholder={'교수 이메일'} />*/}
      {/*      <Button variant={'noActive'} className={'w-fit'}>*/}
      {/*        인증*/}
      {/*      </Button>*/}
      {/*    </div>*/}
      {/*    <P className={'!text-error text-[12px]'}>인증번호가 일치하지 않습니다.</P>*/}
      {/*  </div>*/}
      {/*  <Input type={'text'} className={'w-full'} placeholder={'학교 이름'} />*/}
      {/*  <Input type={'text'} className={'w-full'} placeholder={'학과 이름'} />*/}
      {/*  <Input type={'text'} className={'w-full'} placeholder={'연구실 이름'} />*/}
      {/*</form>*/}
      {/*<Button form={'create-lab-form'} variant={'noActive'}>*/}
      {/*  연구실 생성하기*/}
      {/*</Button>*/}
      {/*<P className={'text-[18px] font-medium'}>교수 인증은 평균 2일 이내에 처리됩니다.</P>*/}
      {/*  <div>*/}
      {/*    <P className={'text-[12px]'}>이미 계정이 있으신가요?</P>*/}
      {/*    <LinkText href={'/login'} className={'text-[12px]'}>*/}
      {/*      로그인하러 가기*/}
      {/*    </LinkText>*/}
      {/*  </div>*/}
      <P className={'text-[32px] font-semibold whitespace-pre-wrap'}>{'김땡땡 님,\n연구실에 참여하세요'}</P>
      <div className={'flex gap-[20px]'}>
        <Radio id={'survey1'} name={'survey'} title={'교수'} />
        <Radio id={'survey2'} name={'survey'} title={'연구원'} />
      </div>
      <div className={'flex gap-[20px]'}>
        <Radio id={'survey3'} name={'student'} title={'학부생'} />
        <Radio id={'survey4'} name={'student'} title={'석사'} />
        <Radio id={'survey5'} name={'student'} title={'박사'} />
      </div>
      <form id={'join-lab-form'} action="" className={'flex w-[400px] flex-col gap-[20px]'}>
        <Input type={'text'} className={'w-full'} placeholder={'초대코드'} />
      </form>
      <Button form={'join-lab-form'} variant={'noActive'}>
        연구실 참여하기
      </Button>
      <div>
        <P className={'text-[12px]'}>이미 계정이 있으신가요?</P>
        <LinkText href={'/login'} className={'text-[12px]'}>
          로그인하러 가기
        </LinkText>
      </div>
    </div>
  )
}

export default AuthServey
