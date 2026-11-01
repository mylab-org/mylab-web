import type { TaskListResponseType, WorksPaperListResponseType } from './types'

/** 연구실 홈 등 미연동 화면용 임시 더미 */
export const DUMMY_WORKS_PAPER: WorksPaperListResponseType = {
  id: 0,
  labId: 0,
  title: '논문 제목',
  status: 'DRAFTING',
  statusLabel: '초안 작성',
  statusStep: 3,
  totalSteps: 5,
  leadAuthor: null,
  members: [],
  schedule: {
    id: 0,
    scheduleType: 'CONFERENCE',
    title: '2025 한국통신학회 동계종합학술발표회',
    startAt: '2026-02-04T00:00:00.000Z',
    endAt: '2026-02-06T00:00:00.000Z',
    location: '모나 용평(용평리조트)',
    submissionDeadline: null,
    dDay: 24,
  },
  createdAt: '2026-01-01T00:00:00.000Z',
}

export const DUMMY_WORKS_TASK: TaskListResponseType = {
  taskId: 0,
  userId: 0,
  type: 'WORK',
  title: '개인 업무 제목',
  description: '업무 설명입니다.',
  startAt: '2026-02-04T00:00:00.000Z',
  endAt: '2026-02-06T00:00:00.000Z',
  status: 'IN_PROGRESS',
  statusLabel: '업무 진행 중',
  statusStep: 2,
  totalSteps: 3,
  createdAt: '2026-01-01T00:00:00.000Z',
}
