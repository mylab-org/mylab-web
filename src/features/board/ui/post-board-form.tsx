import { Image } from 'next/dist/client/image-component'
import { Text } from '@/shared/ui'
import { Button } from '@/shared/ui/button'

export const PostBoardForm = () => {
  return (
    <form className={'border-gray300 flex flex-col gap-[10px] border'}>
      <input
        type="text"
        className={
          'border-b-gray300 placeholder:text-gray400 font-pretendard border-b p-[10px] text-[12px] font-medium outline-0 lg:text-[16px]'
        }
        placeholder={'제목'}
      />
      <textarea
        className={
          'placeholder:text-gray400 font-pretendard h-[100px] resize-none px-[10px] text-[12px] font-medium outline-0 lg:h-[200px] lg:text-[16px]'
        }
        placeholder={'홍길동 님의 소식을 전해주세요'}
      />
      <div className={'border-t-gray300 flex flex-col border-t'}>
        <div className={'flex gap-[5px] px-[10px] pt-[10px]'}>
          <div className={'border-gray300 h-[40px] w-[40px] border lg:h-[80px] lg:w-[80px]'}></div>
          <div
            className={
              'border-gray300 flex h-[40px] w-[40px] items-center justify-center border lg:h-[80px] lg:w-[80px]'
            }
          >
            <Image src={'/icon/icon_board_add.svg'} alt={''} width={24} height={24} />
          </div>
        </div>
        <div className={'flex gap-[20px] p-[10px]'}>
          <div className={'flex items-center gap-[5px]'}>
            <input type="checkbox" />
            <Text className={'text-[10px] lg:text-[14px]'}>익명</Text>
          </div>
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
