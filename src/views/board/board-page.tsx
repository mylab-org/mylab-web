import { BoardContentWrap, BoardMenuWrap, BoardSideWrap } from '@/widgets/board'

export const BoardPage = () => {
  return (
    <div className={'flex flex-1 gap-[10px] rounded-[12px] bg-white py-[10px] focus:outline-none'}>
      <BoardMenuWrap />
      <BoardContentWrap />
      <BoardSideWrap />
    </div>
  )
}
