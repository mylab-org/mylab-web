export const ROLL_TAG = {
  professor: {
    label: '교수',
    bg: 'bg-[#E1F4FF]',
    text: 'text-[#1E75F8]',
  },
  doctoral: {
    label: '박사',
    bg: 'bg-[#FBE9FF]',
    text: 'text-[#8F42FC]',
  },
  master: {
    label: '석사',
    bg: 'bg-[#ECF9DB]',
    text: 'text-[#1BAD20]',
  },
  student: {
    label: '학부생',
    bg: 'bg-[#FFFDD5]',
    text: 'text-[#FA9E3B]',
  },
  leader: {
    label: '랩장',
    bg: 'bg-[#FFF4E9]',
    text: 'text-[#E35C67]',
  },
} as const

export const WORK_TYPE = {
  MEET: {
    NAME: '미팅 준비',
    BG: 'bg-[#FF2056]',
  },
  CONFERENCE: {
    NAME: '학회 업무',
    BG: 'bg-[#2B7FFF]',
  },
  PERSONAL: {
    NAME: '개인 업무',
    BG: 'bg-[#8E51FF]',
  },
}

export const ETC_TYPE = {
  NOTICE: {
    NAME: '중요',
    BG: 'bg-red-100',
    TC: 'text-red-500',
  },
}

/**
 * 캘린더 일정 종류
 * DOT: 일정 카드 / 월간 그리드에 찍히는 점 색상
 * BG, TC: 필터 칩 색상
 */
export const CALENDAR_TYPE = {
  CONFERENCE: {
    NAME: '학회',
    DOT: 'bg-[#1E75F8]',
    BG: 'bg-[#E1F4FF]',
    TC: 'text-[#1E75F8]',
  },
  MEETING: {
    NAME: '미팅',
    DOT: 'bg-[#1BAD20]',
    BG: 'bg-[#ECF9DB]',
    TC: 'text-[#1BAD20]',
  },
  DINNER: {
    NAME: '회식',
    DOT: 'bg-[#E35C67]',
    BG: 'bg-[#FFEBEC]',
    TC: 'text-[#E35C67]',
  },
} as const
