import { BoardCommentItem } from '@/entities/board'
import { BoardItem } from '@/entities/board/ui/board-item'
import { PostBoardCommentForm } from '@/features/board'

export const BoardItemWrap = () => {
  return (
    <div className={'flex flex-col gap-[4px] border-b border-gray-200 py-[10px]'}>
      <BoardItem />
      {/* 댓글 영역 */}
      <div className={'flex flex-col gap-[5px]'}>
        <PostBoardCommentForm />
        <div className={'flex flex-col gap-[4px]'}>
          <BoardCommentItem />
          {/*대댓글 영역*/}
          <div className={'flex flex-col gap-[10px] rounded-[12px] bg-gray-50 px-[20px] py-[10px]'}>
            <BoardCommentItem />
            <BoardCommentItem />
          </div>
        </div>
        <BoardCommentItem />
        <BoardCommentItem />
      </div>
    </div>
  )
}
