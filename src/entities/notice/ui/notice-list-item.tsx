import { Avatar } from '@/shared/ui/override/avatar'
import { Tag } from '@/shared/ui/tag'
import { Text } from '@/shared/ui/text'

export const NoticeListItem = () => {
  return (
    <div className={'flex cursor-pointer flex-col gap-2.5 border-b border-b-gray-200 py-5'}>
      <div className={'flex items-center gap-2.5'}>
        <Tag.Etc variant={'NOTICE'} />
        <h4 className={'text-[14px] font-bold text-gray-900 lg:text-[18px]'}>금주 미팅 안내드립니다.</h4>
      </div>
      <Text className={'text-gray800! truncate text-[12px] lg:text-[16px]'}>
        안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
      </Text>
      <div className={'flex items-center justify-between text-[10px] lg:text-[14px]'}>
        <Text className={'text-[#1a1a1a]!'}>2025.12.04(수) 12:31</Text>
        <Avatar src={'/test.png'} width={20} height={20} imgClassName={'rounded-full'}>
          <Text className={'text-[#1a1a1a]!'}>김교수</Text>
        </Avatar>
      </div>
    </div>
  )
}
