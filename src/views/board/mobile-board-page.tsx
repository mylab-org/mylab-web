import { BoardContentWrap, BoardMenuWrap } from '@/widgets/board'

export const MobileBoardPage = () => {
  return (
    <div className={'flex flex-1 gap-2.5 bg-white px-4 py-2.5 focus:outline-none'}>
      <BoardMenuWrap isDevice />
      {/*<BoardContentWrap />*/}
    </div>
  )
}
