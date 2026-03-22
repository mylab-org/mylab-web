import { Image } from 'next/dist/client/image-component'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Tag } from '@/shared/ui/tag'
import { Text } from '@/shared/ui/text'

export const MoreLabUpdate = () => {
  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 overflow-auto px-5 pb-5 lg:w-[550px] lg:px-7.5'}>
      <div className={'flex flex-col gap-7.5 py-5'}>
        <div className={'flex flex-col gap-5'}>
          <Text className={'text-[12px] font-bold md:text-[16px]'}>연구 분야</Text>
          <div className={'flex justify-between gap-5 rounded-[12px] border border-gray-200 px-3 py-2.5'}>
            <Text className={'text-[14px] font-medium md:text-[18px]'}>컴퓨터 통신</Text>
            <Image src={'/icon/icon_common_drop.svg'} alt={''} width={10} height={5} />
          </div>
        </div>
        <div className={'w-full'}>
          <Text className={'text-[12px] text-gray-600! md:text-[16px]'}>연구실 이름</Text>
          <Input placeholder={'연구실 이름'} className={'w-full'} />
        </div>
        <div className={'w-full'}>
          <Text className={'text-[12px] text-gray-600! md:text-[16px]'}>연구실 소개</Text>
          <Input placeholder={'연구실 소개'} className={'w-full'} />
        </div>
        <div className={'flex flex-col gap-5'}>
          <Text className={'text-[12px]! font-bold md:text-[16px]!'}>연구실 해시태그</Text>
          <div className={'flex flex-wrap gap-1.5'}>
            <span className={'rounded-full bg-gray-200 px-3 py-1 text-[12px] leading-5 font-medium md:text-[14px]'}>
              + 추가하기
            </span>
            <Tag.Lab
              className={'flex items-center gap-0.75'}
              Icon={<Image src={'/icon/x.svg'} alt={''} width={16} height={16} className={'cursor-pointer'} />}
            >
              무선 네트워크
            </Tag.Lab>
            <Tag.Lab
              className={'flex items-center gap-0.75'}
              Icon={<Image src={'/icon/x.svg'} alt={''} width={16} height={16} className={'cursor-pointer'} />}
            >
              모바일 엣지/클라우드 컴퓨팅
            </Tag.Lab>
            <Tag.Lab
              className={'flex items-center gap-0.75'}
              Icon={<Image src={'/icon/x.svg'} alt={''} width={16} height={16} className={'cursor-pointer'} />}
            >
              스마트 IoT
            </Tag.Lab>
            <Tag.Lab
              className={'flex items-center gap-0.75'}
              Icon={<Image src={'/icon/x.svg'} alt={''} width={16} height={16} className={'cursor-pointer'} />}
            >
              차세대 모바일 이동통신 (5G/6G)
            </Tag.Lab>
            <Tag.Lab
              className={'flex items-center gap-0.75'}
              Icon={<Image src={'/icon/x.svg'} alt={''} width={16} height={16} className={'cursor-pointer'} />}
            >
              지능형 미디어 통신
            </Tag.Lab>
          </div>
        </div>
      </div>
      <Button className={'mt-5 text-[12px]! md:text-[16px]!'}>연구실 정보 수정하기</Button>
    </div>
  )
}
