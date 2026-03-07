import { Image } from 'next/dist/client/image-component'
import { Button, Input, Tag, Text } from '@/shared/ui'

export const MoreLabUpdate = () => {
  return (
    <div
      className={
        'flex min-h-0 w-full flex-1 flex-col gap-[10px] overflow-auto px-[20px] pb-[20px] lg:w-[550px] lg:px-[30px]'
      }
    >
      <div className={'flex flex-col gap-[30px] py-[20px]'}>
        <div className={'flex flex-col gap-[20px]'}>
          <Text className={'text-[12px] font-bold md:text-[16px]'}>연구 분야</Text>
          <div className={'flex justify-between gap-[20px] rounded-[12px] border border-gray-200 px-[12px] py-[10px]'}>
            <Text className={'text-[14px] font-medium md:text-[18px]'}>컴퓨터 통신</Text>
            <Image src={'/icon/icon_common_drop.svg'} alt={''} width={10} height={5} />
          </div>
        </div>
        <div className={'w-full'}>
          <Text className={'text-[12px] text-gray-600! md:text-[16px]'}>연구실 이름</Text>
          <Input placeholder={'연구실 이름'} className={'w-full text-[14px]! md:text-[18px]!'} />
        </div>
        <div className={'w-full'}>
          <Text className={'text-[12px] text-gray-600! md:text-[16px]'}>연구실 소개</Text>
          <Input placeholder={'연구실 소개'} className={'w-full text-[14px]! md:text-[18px]!'} />
        </div>
        <div className={'flex flex-col gap-[20px]'}>
          <Text className={'text-[12px]! font-bold md:text-[16px]!'}>연구실 해시태그</Text>
          <div className={'flex flex-wrap gap-[6px]'}>
            <span
              className={
                'font-pretendard rounded-full bg-gray-200 px-[12px] py-[4px] text-[12px] leading-[20px] font-medium md:text-[14px]'
              }
            >
              + 추가하기
            </span>
            <Tag.Lab
              className={'flex items-center gap-[3px]'}
              Icon={<Image src={'/icon/x.svg'} alt={''} width={16} height={16} className={'cursor-pointer'} />}
            >
              무선 네트워크
            </Tag.Lab>
            <Tag.Lab
              className={'flex items-center gap-[3px]'}
              Icon={<Image src={'/icon/x.svg'} alt={''} width={16} height={16} className={'cursor-pointer'} />}
            >
              모바일 엣지/클라우드 컴퓨팅
            </Tag.Lab>
            <Tag.Lab
              className={'flex items-center gap-[3px]'}
              Icon={<Image src={'/icon/x.svg'} alt={''} width={16} height={16} className={'cursor-pointer'} />}
            >
              스마트 IoT
            </Tag.Lab>
            <Tag.Lab
              className={'flex items-center gap-[3px]'}
              Icon={<Image src={'/icon/x.svg'} alt={''} width={16} height={16} className={'cursor-pointer'} />}
            >
              차세대 모바일 이동통신 (5G/6G)
            </Tag.Lab>
            <Tag.Lab
              className={'flex items-center gap-[3px]'}
              Icon={<Image src={'/icon/x.svg'} alt={''} width={16} height={16} className={'cursor-pointer'} />}
            >
              지능형 미디어 통신
            </Tag.Lab>
          </div>
        </div>
      </div>
      <Button className={'mt-[20px] text-[12px]! md:text-[16px]!'}>연구실 정보 수정하기</Button>
    </div>
  )
}
