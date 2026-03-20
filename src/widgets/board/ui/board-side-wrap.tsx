import { Text } from '@/shared/ui/text'

export const BoardSideWrap = () => {
  return (
    <section className={'flex w-[400px] flex-col gap-5 p-2.5'}>
      <h3 className={'text-[25px] font-bold'}>공지사항</h3>
      <div className={'flex flex-1 flex-col gap-2.5'}>
        <div className={'flex flex-col gap-1.25 py-2.5'}>
          <Text className={'text-[18px] font-bold'}>비품 확인해주세요</Text>
          <Text className={'text-[14px] font-medium text-gray-400!'}>26.01.31 (토) 19:30 </Text>
        </div>
        <div className={'flex flex-col gap-1.25 py-2.5'}>
          <Text className={'text-[18px] font-bold'}>비품 확인해주세요</Text>
          <Text className={'text-[14px] font-medium text-gray-400!'}>26.01.31 (토) 19:30 </Text>
        </div>
        <div className={'flex flex-col gap-1.25 py-2.5'}>
          <Text className={'text-[18px] font-bold'}>비품 확인해주세요</Text>
          <Text className={'text-[14px] font-medium text-gray-400!'}>26.01.31 (토) 19:30 </Text>
        </div>
      </div>
    </section>
  )
}
