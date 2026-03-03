import { BoardContentWrap, BoardMenuWrap } from '@/widgets/board'

export const MobileBoardPage = () => {
  return (
    <div className={'flex flex-1 gap-[10px] bg-white px-[20px] py-[10px] focus:outline-none'}>
      <BoardMenuWrap isDevice />
      {/*<BoardContentWrap />*/}
    </div>
  )
}
