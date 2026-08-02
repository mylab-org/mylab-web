import { formatEventPeriod } from '../lib/date'
import { CALENDAR_TYPE } from '@/shared/constant/tag'
import { cn } from '@/shared/lib'
import { Tag } from '@/shared/ui/tag'
import { Text } from '@/shared/ui/text'
import type { CalendarEvent } from '../model/types'

interface CalendarListItemProps {
  event?: CalendarEvent
  className?: string
}

/** TODO: API 연동 전, event 를 넘기지 않는 메인/사이드 화면을 위한 임시 기본값 */
const DEFAULT_EVENT: CalendarEvent = {
  id: 0,
  type: 'CONFERENCE',
  title: '2025 한국통신학회 동계종합학술발표회',
  startDate: '2026-02-04',
  endDate: '2026-02-06',
  place: '모나 용평(용평리조트)',
  members: [],
}

export const CalendarListItem = ({ event = DEFAULT_EVENT, className }: CalendarListItemProps) => {
  const { type, title, place, members } = event

  return (
    <div className={cn('flex flex-col gap-1.25 rounded-[12px] border border-[#E2E3E5] px-3 py-4', className)}>
      <div className={'flex items-center gap-1.25'}>
        <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', CALENDAR_TYPE[type].DOT)} />
        <Text className={'text-[14px] font-bold'}>{title}</Text>
      </div>
      <div>
        <Text className={'text-[14px] font-light'}>{formatEventPeriod(event)}</Text>
        <Text className={'text-[14px] font-light'}>{place}</Text>
      </div>
      {members.length > 0 && (
        <ul className={'flex flex-wrap items-center gap-1.25'}>
          {members.map(member => (
            <li key={member}>
              <Tag.CalendarMember name={member} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
