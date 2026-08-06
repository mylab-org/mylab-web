import { BoardContentWrap, BoardMenuWrap, BoardSideWrap } from '@/widgets/board'

export const BoardPage = () => {
  return (
    <div
      className={
        'flex flex-1 gap-2.5 rounded-[12px] bg-white py-2.5 shadow-[0px_1px_3px_rgba(0,0,0,0.03),0px_4px_16px_rgba(0,0,0,0.04)] focus:outline-none'
      }
    >
      <BoardMenuWrap />
      <BoardContentWrap />
      <BoardSideWrap />
    </div>
  )
}
