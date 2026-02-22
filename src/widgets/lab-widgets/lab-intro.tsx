import { Tag, Text } from '@/shared/ui'

export const LabIntro = () => {
  return (
    <div className={'flex flex-col gap-[14px] rounded-[24px] bg-white p-[20px] md:p-[24px]'}>
      <h3 className={'font-pretendard text-[18px] leading-[32px] font-bold text-blue-600 md:text-[24px]'}>
        마이랩 연구실
      </h3>
      <div className={'flex flex-wrap gap-[6px]'}>
        <Tag.Lab>무선 네트워크</Tag.Lab>
        <Tag.Lab>모바일 엣지/클라우드 컴퓨팅</Tag.Lab>
        <Tag.Lab>스마트 IoT</Tag.Lab>
        <Tag.Lab>차세대 모바일 이동통신 (5G/6G)</Tag.Lab>
        <Tag.Lab>지능형 미디어 통신</Tag.Lab>
      </div>
      <div className={'bg-gray100 w-full rounded-[8px] px-[10px] py-[8px]'}>
        <Text className={'text-[12px] font-medium md:text-[14px]'}>
          본 연구실은 광대역 지능형 통신 네트워크를 연구합니다.
        </Text>
      </div>
    </div>
  )
}
