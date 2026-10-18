export const LABS_CREATE_RESPONSE_INFO_ROWS = [
  { key: 'universityName', label: '학교명' },
  { key: 'departmentName', label: '학과명' },
  { key: 'labName', label: '연구실명' },
] as const

export const LABS_JOIN_MODAL_PREV_INFO_ROWS = [
  ...LABS_CREATE_RESPONSE_INFO_ROWS,
  { key: 'professorName', label: '지도교수' },
] as const
