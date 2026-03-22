import { Image } from 'next/dist/client/image-component'
import { Avatar } from '@/shared/ui/avatar'
import { CheckBox } from '@/shared/ui/checkbox'
import { Text } from '@/shared/ui/text'

export const MoreLabMember = () => {
  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 overflow-auto px-5 pb-5 lg:w-[550px] lg:px-7.5'}>
      <Text className={'text-[14px] font-medium text-gray-900!'}>총 4명</Text>
      <div className={'flex flex-col gap-7.5 py-5'}>
        <div className={'flex items-center justify-between gap-2.5'}>
          <Avatar
            src={'/test.png'}
            alt={'profile'}
            width={50}
            height={50}
            imgClassName={'h-[30px] w-[30px] rounded-full md:h-[50px] md:w-[50px]'}
          >
            <Text className={'text-[12px] font-medium text-gray-900! md:text-[16px]'}>김교수</Text>
          </Avatar>
          <div className={'flex items-center gap-5'}>
            <CheckBox title={'랩장'} after />
            <div className={'flex gap-1'}>
              <Image src={'/icon/icon_more_logout.svg'} alt={''} width={16} height={16} />
              <Text className={'text-[10px] font-normal text-slate-400 md:text-[12px]'}>내보내기</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
