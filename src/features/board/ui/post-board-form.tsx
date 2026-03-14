import { Image } from 'next/dist/client/image-component'
import { Button } from '@/shared/ui/button'
import { CheckBox } from '@/shared/ui/checkbox'
import { Textarea } from '@/shared/ui/textarea'

export const PostBoardForm = () => {
  return (
    <form className={'flex flex-col gap-[10px] border border-gray-300'}>
      <input
        type="text"
        className={
          'font-pretendard border-b border-b-gray-300 p-[10px] text-[12px] font-medium outline-0 placeholder:text-gray-400 lg:text-[16px]'
        }
        placeholder={'제목'}
      />
      <Textarea
        className={'h-[100px] px-[10px] text-[12px] lg:h-[200px] lg:text-[16px]'}
        placeholder={'홍길동 님의 소식을 전해주세요'}
      />
      <div className={'flex flex-col border-t border-t-gray-300'}>
        <div className={'flex gap-[5px] px-[10px] pt-[10px]'}>
          <div className={'h-[40px] w-[40px] border border-gray-300 lg:h-[80px] lg:w-[80px]'}></div>
          <div
            className={
              'flex h-[40px] w-[40px] items-center justify-center border border-gray-300 lg:h-[80px] lg:w-[80px]'
            }
          >
            <Image src={'/icon/icon_board_add.svg'} alt={''} width={24} height={24} />
          </div>
        </div>
        <div className={'flex gap-[20px] p-[10px]'}>
          <CheckBox title="익명" />
          <Image
            src={'/icon/icon_main_img.svg'}
            alt={''}
            width={24}
            height={24}
            className={'h-[16px] w-[16px] lg:h-[24px] lg:w-[24px]'}
          />
        </div>
        <Button className={'rounded-t-[6px] rounded-b-none text-[12px]! lg:text-[16px]'}>게시</Button>
      </div>
    </form>
  )
}
