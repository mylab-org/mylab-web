import { Text } from '@/shared/ui/text'

export const BoardItem = () => {
  return (
    <div className={'flex flex-col gap-1'}>
      <h4 className={'text-[16px] font-bold lg:text-[18px]'}>비품 요청 드립니다!!!!!!</h4>
      <Text className={'text-[10px] font-medium text-gray-400! lg:text-[12px]'}>
        익명 님이 남긴 글 · ****** · 컴퓨터 통신
      </Text>
      <Text className={'text-[12px] font-normal whitespace-pre-wrap lg:text-[14px]'}>
        {`참쌀 빨간색을 강력히 원합니다!@@!@!@\n커피캡슐도 종류가많앗으면 좋겟어염 저는 산미가 싫은데 하도 꼬소한거 다먹어서 이제 산미 있는거밖에없고 비카페인밖에없어여`}
      </Text>
    </div>
  )
}
