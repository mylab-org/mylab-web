import { Text } from '@/shared/ui'

export const BoardMenuWrap = () => {
  return (
    <section className={'flex w-[200px] flex-col gap-[10px] p-[10px]'}>
      <div className={'flex flex-col gap-[10px] border-b border-b-gray-200 pb-[15px]'}>
        <h3 className={'font-pretendard text-gray400! px-[6px] text-[14px] font-semibold'}>우리 연구실 메뉴</h3>
        <Text className={'flex h-[36px] items-center rounded-[8px] bg-[#F1F2F3] px-[12px] font-semibold'}>
          자유 게시판
        </Text>
        <Text className={'flex h-[36px] items-center rounded-[8px] px-[12px]'}>공지사항</Text>
        <Text className={'flex h-[36px] items-center rounded-[8px] px-[12px]'}>게시판 명</Text>
      </div>
      <div className={'flex flex-col gap-[10px] pt-[15px]'}>
        <h3 className={'font-pretendard text-gray400! px-[6px] text-[14px] font-semibold'}>공유 카테고리</h3>
        <Text className={'flex h-[36px] items-center rounded-[8px] px-[12px]'}>자유 게시판</Text>
        <Text className={'flex h-[36px] items-center rounded-[8px] px-[12px]'}>게시판 1</Text>
        <Text className={'flex h-[36px] items-center rounded-[8px] px-[12px]'}>게시판 2</Text>
      </div>
    </section>
  )
}
