import { BoardContentWrap, BoardMenuWrap, BoardSideWrap } from '@/widgets/board'

export const BoardPage = () => {
  return (
    <div className={'flex flex-1 gap-2.5 rounded-[12px] bg-white py-2.5 focus:outline-none'}>
      <BoardMenuWrap />
      <BoardContentWrap />
      <BoardSideWrap />
    </div>
  )
}
