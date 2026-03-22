import { Image } from 'next/dist/client/image-component'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Radio } from '@/shared/ui/radio'
import { Text } from '@/shared/ui/text'

export const SideDataPost = () => {
  return (
    <div className={'flex flex-1 flex-col'}>
      <form action="" className={'flex flex-col gap-2.5 py-5'}>
        <div className={'flex gap-5'}>
          <Radio id={'type1'} value={'professor'} title={'논문 및 저널'} />
          <Radio id={'type2'} value={'student'} title={'연구 참고 자료'} />
        </div>
        <Input placeholder={'자료 제목'} />
        <Input placeholder={'자료 링크'} />
        <div
          className={
            'flex h-[165px] flex-col items-center justify-center gap-2.5 rounded-[16px] border-4 border-dotted border-gray-300 bg-gray-100'
          }
        >
          <Image src={'/icon/icon_main_file.svg'} alt={''} width={30} height={30} />
          <Text className={'text-[18px] font-semibold text-gray-400!'}>
            이곳을 클릭하거나 첨부 파일을 드래그해 놓으세요
          </Text>
        </div>
      </form>
      <Button className={'mt-2.5 mb-5'}>비품 신청하기</Button>
    </div>
  )
}
