import { BoardCommentItem, BoardContentMenu, BoardItem } from '@/entities/board'
import { PostBoardCommentForm } from '@/features/board'

export const BoardItemWrap = () => {
  return (
    <div className={'flex flex-col gap-1 border-b border-gray-200 py-2.5'}>
      <BoardItem />
      {/* 댓글 영역 */}
      <BoardContentMenu />
      <div className={'flex flex-col gap-1.25'}>
        <PostBoardCommentForm />
        <div className={'flex flex-col gap-1'}>
          <BoardCommentItem />
          {/*대댓글 영역*/}
          <div className={'flex flex-col gap-2.5 rounded-[12px] bg-gray-50 px-5 py-2.5'}>
            <BoardCommentItem />
            <BoardCommentItem />
          </div>
        </div>
      </div>
    </div>
  )
}
