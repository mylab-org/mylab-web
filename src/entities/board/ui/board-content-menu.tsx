import { Image } from 'next/dist/client/image-component'
import { Text } from '@/shared/ui/text'

export const BoardContentMenu = () => {
  return (
    <div className={'flex items-center justify-between py-2.5'}>
      <div className={'flex gap-2.5 lg:gap-5'}>
        <button className={'flex cursor-pointer items-center gap-1.25'}>
          <Image
            src={'/icon/icon_board_notlike.svg'}
            alt={''}
            width={20}
            height={20}
            className={'h-4 w-4 lg:h-5 lg:w-5'}
          />
          <Text className={'text-[12px] text-slate-400 lg:text-[16px]'}>2</Text>
        </button>
        <button className={'flex cursor-pointer items-center gap-1.25'}>
          <Image
            src={'/icon/icon_board_comment.svg'}
            alt={''}
            width={20}
            height={20}
            className={'h-4 w-4 lg:h-5 lg:w-5'}
          />
          <Text className={'text-[12px] text-slate-400 lg:text-[16px]'}>2</Text>
        </button>
        <button className={'flex cursor-pointer items-center gap-1.25'}>
          <Image
            src={'/icon/icon_board_update.svg'}
            alt={''}
            width={20}
            height={20}
            className={'h-4 w-4 lg:h-5 lg:w-5'}
          />
          <Text className={'text-[12px] text-slate-400 lg:text-[16px]'}>수정</Text>
        </button>
        <button className={'flex cursor-pointer items-center gap-1.25'}>
          <Image
            src={'/icon/icon_board_delete.svg'}
            alt={''}
            width={20}
            height={20}
            className={'h-4 w-4 lg:h-5 lg:w-5'}
          />
          <Text className={'text-[12px] text-slate-400 lg:text-[16px]'}>삭제</Text>
        </button>
      </div>
      <Text className={'text-[10px] font-medium text-gray-400 lg:text-[14px]'}>26.01.31 (토) 19:30</Text>
    </div>
  )
}
