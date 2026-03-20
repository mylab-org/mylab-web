import { ChatItem } from '@/entities/work-side'
import { WorkChatForm } from '@/features/works'

export const WorkSideChat = () => {
  return (
    <div className={'flex min-h-0 flex-1 flex-col gap-2.5 border-t border-t-gray-300'}>
      <div className={'flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto py-5'}>
        <ChatItem isMy={false} />
        <ChatItem isMy={true} />
      </div>
      <WorkChatForm />
    </div>
  )
}
