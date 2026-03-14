import { Input } from '@/shared/ui/input'
import { Select, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/shadcn'
import { SelectContent } from '@/shared/ui/shadcn/select'
import { Text } from '@/shared/ui/text'

export const MoreUserUpdate = () => {
  return (
    <div
      className={
        'flex min-h-0 w-full flex-1 flex-col gap-[10px] overflow-auto px-[20px] pb-[20px] lg:w-[550px] lg:px-[30px]'
      }
    >
      <div className={'flex flex-col items-center gap-[10px] py-[10px]'}>
        <div className={'h-[80px] w-[80px] rounded-full bg-gray-300 md:h-[120px] md:w-[120px]'}></div>
        <div className={'w-full'}>
          <Text className={'text-[14px] text-gray-600!'}>이름</Text>
          <Input placeholder={'이름'} className={'w-full'} />
        </div>
        <div className={'w-full'}>
          <Text className={'text-[14px] text-gray-600!'}>이메일</Text>
          <Input placeholder={'이메일'} className={'w-full'} />
        </div>
        <div className={'flex w-full items-center justify-between'}>
          <Text className={'text-[14px] text-gray-600!'}>학위</Text>
          <Select>
            <SelectTrigger className="w-[100px] rounded-[12px] border-none bg-gray-100 text-[18px] font-medium">
              <SelectValue placeholder="학위" />
            </SelectTrigger>
            <SelectContent
              position={'popper'}
              sideOffset={4}
              color={'white'}
              className={'border-none text-[18px] font-medium ring-0'}
            >
              <SelectGroup>
                <SelectItem value="light" className={'text-[18px] font-medium'}>
                  박사
                </SelectItem>
                <SelectItem value="dark" className={'text-[18px] font-medium'}>
                  석사
                </SelectItem>
                <SelectItem value="system" className={'text-[18px] font-medium'}>
                  학부생
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/*<Button className={'mt-[30px] text-[12px]! md:text-[16px]!'}>회원정보 수정하기</Button>*/}
    </div>
  )
}
