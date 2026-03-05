import { Image } from 'next/dist/client/image-component'
import { Text } from '@/shared/ui'

export const MoreLabMember = () => {
  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-[10px] px-[20px] lg:w-[550px] lg:px-[30px]'}>
      <Text className={'text-gray900! text-[14px] font-medium'}>총 4명</Text>
      <div className={'flex flex-col gap-[30px] py-[20px]'}>
        <div className={'flex items-center justify-between gap-[10px]'}>
          <div className={'flex items-center gap-[10px]'}>
            <div className={'bg-gray300 h-[50px] w-[50px] rounded-full'}></div>
            <Text className={'text-gray900! text-[16px] font-medium'}>김교수</Text>
          </div>
          <div className={'flex items-center gap-[20px]'}>
            <label
              htmlFor="checkbox"
              className={
                'flex items-center gap-[12px] text-[14px] font-medium after:ml-2 after:text-gray-300 after:content-["|"]'
              }
            >
              <input id={'checkbox'} type="checkbox" />
              랩장
            </label>
            <div className={'flex gap-[4px]'}>
              <Image src={'/icon/icon_more_logout.svg'} alt={''} width={16} height={16} />
              <Text className={'text-[12px] font-normal text-slate-400'}>내보내기</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
