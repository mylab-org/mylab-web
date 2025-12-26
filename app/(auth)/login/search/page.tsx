import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { LinkText } from '@/shared/ui/link-text'
import { P } from '@/shared/ui/p'

const AuthSearch = () => {
  return (
    // <div className={'flex flex-col gap-[20px]'}>
    //   <P className={'text-[32px] font-semibold'}>아이디 찾기</P>
    //   <P className={'text-[32px] font-semibold'}>wls****</P>
    //   <form id={'search-id-form'} action="" className={'flex w-[400px] flex-col gap-[20px]'}>
    //     <div>
    //       <Input type={'text'} className={'w-full'} placeholder={'전화번호 입력'} />
    //       <P className={'!text-error text-[12px]'}>아이디를 찾을 수 없습니다</P>
    //     </div>
    //   </form>
    //   <Button form={'search-id-form'} variant={'noActive'}>
    //     아이디 찾기
    //   </Button>
    //     <div className={'flex flex-col'}>
    //       <P className={'text-[12px]'}>비밀번호를 잊으셨나요?</P>
    //       <LinkText href={'/login'} className={'text-[12px]'}>
    //         비밀번호 재설정하기
    //       </LinkText>
    //     </div>
    // </div>
    <div className={'flex flex-col gap-[20px]'}>
      <P className={'text-[32px] font-semibold'}>비밀번호 재설정하기</P>
      <form id={'search-pw-form'} action="" className={'flex w-[400px] flex-col gap-[20px]'}>
        <div>
          <div className={'flex gap-[6px]'}>
            <Input type={'text'} className={'flex-1'} placeholder={'전화번호'} />
            <Button variant={'noActive'} className={'w-fit'}>
              인증
            </Button>
          </div>
          <P className={'!text-error text-[12px]'}>이미 사용 중인 전화번호입니다</P>
        </div>
        <div>
          <div className={'flex gap-[6px]'}>
            <Input type={'text'} className={'flex-1'} placeholder={'인증번호'} />
            <Button variant={'noActive'} className={'w-fit'}>
              확인
            </Button>
          </div>
          <P className={'!text-error text-[12px]'}>이미 사용 중인 전화번호입니다</P>
        </div>
      </form>
      <Button form={'search-pw-form'} variant={'noActive'}>
        비밀번호 재설정하기
      </Button>
      <div className={'flex flex-col'}>
        <P className={'text-[12px]'}>아이디를 잊으셨나요?</P>
        <LinkText href={'/login'} className={'text-[12px]'}>
          아이디 찾기
        </LinkText>
      </div>
    </div>
  )
}

export default AuthSearch
