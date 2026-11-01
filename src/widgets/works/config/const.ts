export const WORKS_PAPER_COLUMNS: { status: PaperStatusType; label: string }[] = [
  { status: 'RESEARCH_PREP', label: '연구 준비' },
  { status: 'EXPERIMENT', label: '실험 진행' },
  { status: 'DRAFTING', label: '초안 작성' },
  { status: 'PROFESSOR_REVIEW', label: '교수 검토' },
  { status: 'COMPLETED', label: '완료' },
]

export const WORKS_TASK_COLUMNS: { status: TaskStatusType; label: string }[] = [
  { status: 'READY', label: '할 일' },
  { status: 'IN_PROGRESS', label: '진행 중' },
  { status: 'COMPLETED', label: '완료' },
]
