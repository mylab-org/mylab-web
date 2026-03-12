import { Text } from '@/shared/ui'

export const WorkSideChat = () => {
  return (
    <div className={'flex min-h-0 flex-1 flex-col gap-[10px] border-t border-t-gray-300'}>
      <div className={'flex min-h-0 flex-1 flex-col gap-[10px] overflow-y-auto py-[20px]'}>
        <div className={'flex flex-col gap-[4px]'}>
          <div className={'flex items-center gap-[10px]'}>
            <div className={'h-[24px] w-[24px] rounded-full bg-gray-200'} />
            <Text className={'text-[12px] font-semibold md:text-[14px]'}>홍길동</Text>
          </div>
          <Text
            className={'w-fit max-w-[90%] rounded-[12px] bg-slate-100 p-[10px] text-[12px] font-medium md:text-[14px]'}
          >
            참여자들과 의견을 나누어보세요
          </Text>
        </div>

        {/*  나 */}
        <div className={'flex justify-end'}>
          <Text
            className={'w-fit max-w-[90%] rounded-[12px] bg-blue-100 p-[10px] text-[12px] font-medium md:text-[14px]'}
          >
            참여자들과 의견을 나누어보세요 참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을
            나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을
            나누어보세요참여자들과 의견을 나누어보세요
          </Text>
        </div>
      </div>
      <div className={'flex flex-col gap-[10px] bg-[#FAFAFA] p-[10px]'}>
        <Text className={'text-[12px] font-semibold text-gray-600! md:text-[14px]'}>홍길동</Text>
        <textarea
          className={
            'font-pretendard border-gray400 placeholder:text-gray400 h-[80px] border bg-white p-[5px] text-[12px] font-medium outline-0 md:text-[14px]'
          }
          placeholder={'참여자들과 의견을 나누어보세요'}
        />
      </div>
    </div>
  )
}
