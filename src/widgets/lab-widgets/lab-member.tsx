import { LabUser } from '@/entities/lab'
import { Tag } from '@/shared/ui/tag'
import { Text } from '@/shared/ui/text'

export const LabMember = () => {
  return (
    <div className={'flex flex-col gap-[14px] rounded-[24px] bg-white p-[24px]'}>
      <h3 className={'text-[24px] leading-[32px] font-bold'}>연구원</h3>
      <LabUser>김교수</LabUser>
      <div className={'flex items-center justify-between'}>
        <Text className={'text-[16px] font-medium'}>이랩장</Text>
        <div className={'flex gap-[4px]'}>
          <Tag.Roll variant={'leader'} />
          <Tag.Roll variant={'doctoral'} />
        </div>
      </div>
      <div className={'flex items-center justify-between'}>
        <Text className={'text-[16px] font-medium'}>이랩장</Text>
        <div className={'flex gap-[4px]'}>
          <Tag.Roll variant={'master'} />
        </div>
      </div>
      <div className={'flex items-center justify-between'}>
        <Text className={'text-[16px] font-medium'}>이랩장</Text>
        <div className={'flex gap-[4px]'}>
          <Tag.Roll variant={'leader'} />
          <Tag.Roll variant={'student'} />
        </div>
      </div>
      <div className={'flex items-center justify-between'}>
        <Text className={'text-[16px] font-medium'}>이랩장</Text>
        <div className={'flex gap-[4px]'}>
          <Tag.Roll variant={'student'} />
        </div>
      </div>
      <div className={'flex items-center justify-between'}>
        <Text className={'text-[16px] font-medium'}>이랩장</Text>
        <div className={'flex gap-[4px]'}>
          <Tag.Roll variant={'student'} />
        </div>
      </div>
      <div className={'flex items-center justify-between'}>
        <Text className={'text-[16px] font-medium'}>이랩장</Text>
        <div className={'flex gap-[4px]'}>
          <Tag.Roll variant={'student'} />
        </div>
      </div>
      <div className={'flex items-center justify-between'}>
        <Text className={'text-[16px] font-medium'}>이랩장</Text>
        <div className={'flex gap-[4px]'}>
          <Tag.Roll variant={'student'} />
        </div>
      </div>
    </div>
  )
}
