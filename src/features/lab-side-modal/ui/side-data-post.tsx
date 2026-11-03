import { FileUp } from 'lucide-react'
import { Button } from '@/shared/ui/override/button'
import { Input } from '@/shared/ui/override/input'
import { Radio, RadioGroup } from '@/shared/ui/override/radio'
import { Text } from '@/shared/ui/override/text'

export const SideDataPost = () => {
  return (
    <div className={'flex flex-1 flex-col'}>
      <form action="" className={'flex flex-col gap-2.5 py-5'}>
        <RadioGroup>
          <Radio id={'type1'} value={'professor'} title={'논문 및 저널'} />
          <Radio id={'type2'} value={'student'} title={'연구 참고 자료'} />
        </RadioGroup>
        <Input placeholder={'자료 제목'} />
        <Input placeholder={'자료 링크'} />
        <div
          className={
            'border-border bg-muted flex h-[165px] flex-col items-center justify-center gap-2.5 rounded-[16px] border-2'
          }
        >
          <FileUp className={'text-muted-foreground h-7 w-7'} />
          <Text className={'text-muted-foreground text-[14px] font-semibold'}>
            이곳을 클릭하거나 첨부 파일을 드래그해 놓으세요
          </Text>
        </div>
      </form>
      <Button className={'mt-2.5 mb-5'}>비품 신청하기</Button>
    </div>
  )
}
