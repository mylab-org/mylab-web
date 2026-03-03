import { Image } from 'next/dist/client/image-component'
import { Text } from '@/shared/ui'

export const BoardItem = () => {
  return (
    <div className={'flex flex-col gap-[4px]'}>
      <h4 className={'font-pretendard text-[18px] font-bold'}>비품 요청 드립니다!!!!!!</h4>
      <Text className={'text-gray400! text-[12px] font-medium'}>익명 님이 남긴 글 · ****** · 컴퓨터 통신</Text>
      <Text className={'text-[14px] font-normal whitespace-pre-wrap'}>
        {`참쌀 빨간색을 강력히 원합니다!@@!@!@\n커피캡슐도 종류가많앗으면 좋겟어염 저는 산미가 싫은데 하도 꼬소한거 다먹어서 이제 산미 있는거밖에없고 비카페인밖에없어여`}
      </Text>
      <div className={'flex items-center justify-between py-[10px]'}>
        <div className={'flex gap-[20px]'}>
          <button className={'flex cursor-pointer items-center gap-[10px]'}>
            <Image src={'/icon/icon_board_notlike.svg'} alt={''} width={20} height={20} />
            <Text className={'text-[16px] text-slate-400!'}>2</Text>
          </button>
          <button className={'flex cursor-pointer items-center gap-[10px]'}>
            <Image src={'/icon/icon_board_comment.svg'} alt={''} width={20} height={20} />
            <Text className={'text-[16px] text-slate-400!'}>2</Text>
          </button>
          <button className={'flex cursor-pointer items-center gap-[10px]'}>
            <Image src={'/icon/icon_board_update.svg'} alt={''} width={20} height={20} />
            <Text className={'text-[16px] text-slate-400!'}>2</Text>
          </button>
          <button className={'flex cursor-pointer items-center gap-[10px]'}>
            <Image src={'/icon/icon_board_delete.svg'} alt={''} width={20} height={20} />
            <Text className={'text-[16px] text-slate-400!'}>2</Text>
          </button>
        </div>
        <Text className={'text-gray400! text-[14px] font-medium'}>26.01.31 (토) 19:30</Text>
      </div>
    </div>
  )
}
