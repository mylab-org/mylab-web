import { Image } from 'next/dist/client/image-component'
import { Button, Input, Radio, Text } from '@/shared/ui'

export const SideDataPost = () => {
  return (
    <div className={'flex flex-1 flex-col'}>
      <form action="" className={'flex flex-col gap-[10px] py-[20px]'}>
        <div className={'flex gap-[20px]'}>
          <Radio id={'type1'} value={'professor'} title={'논문 및 저널'} />
          <Radio id={'type2'} value={'student'} title={'연구 참고 자료'} />
        </div>
        <Input placeholder={'자료 제목'} />
        <Input placeholder={'자료 링크'} />
        <div
          className={
            'bg-gray100 border-gray300 flex h-[165px] flex-col items-center justify-center gap-[10px] rounded-[16px] border border-4 border-dotted'
          }
        >
          <Image src={'/icon/icon_main_file.svg'} alt={''} width={30} height={30} />
          <Text className={'text-gray400! text-[18px] font-semibold'}>
            이곳을 클릭하거나 첨부 파일을 드래그해 놓으세요
          </Text>
        </div>
      </form>
      <Button className={'mt-[10px] mb-[20px]'}>비품 신청하기</Button>
    </div>
  )
}
