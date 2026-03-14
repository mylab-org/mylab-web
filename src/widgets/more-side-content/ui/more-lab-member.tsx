import { Image } from 'next/dist/client/image-component'
import { CheckBox } from '@/shared/ui/checkbox'
import { Text } from '@/shared/ui/text'

export const MoreLabMember = () => {
  return (
    <div
      className={
        'flex min-h-0 w-full flex-1 flex-col gap-[10px] overflow-auto px-[20px] pb-[20px] lg:w-[550px] lg:px-[30px]'
      }
    >
      <Text className={'text-[14px] font-medium text-gray-900!'}>총 4명</Text>
      <div className={'flex flex-col gap-[30px] py-[20px]'}>
        <div className={'flex items-center justify-between gap-[10px]'}>
          <div className={'flex items-center gap-[10px]'}>
            <div className={'h-[30px] w-[30px] rounded-full bg-gray-300 md:h-[50px] md:w-[50px]'}></div>
            <Text className={'text-[12px] font-medium text-gray-900! md:text-[16px]'}>김교수</Text>
          </div>
          <div className={'flex items-center gap-[20px]'}>
            <CheckBox title={'랩장'} after />
            <div className={'flex gap-[4px]'}>
              <Image src={'/icon/icon_more_logout.svg'} alt={''} width={16} height={16} />
              <Text className={'text-[10px] font-normal text-slate-400 md:text-[12px]'}>내보내기</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
