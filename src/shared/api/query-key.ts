export const QUERY_KEYS = {
  USERS: {
    ROOT: ['users', 'detail'],
  },
  AUTH: {
    VERIFY_EMAIL: ['auth', 'verify-email'],
  },
  LABS: {
    CHK_VALIDATE: (code: string) => ['labs', 'invite-codes', 'chk-validate', code],
    MEMBERS: (labId: number) => ['labs', 'members', labId],
    DETAIL: (labId: number) => ['labs', 'detail', labId],
    LINKS: (labId: number) => ['labs', 'links', labId],
  },
  BOARD: {
    CATEGORY: (labId: number) => ['board', 'category', labId],
    LIST: (categoryId: number) => ['board', 'list', categoryId],
  },
  COMMENT: {
    LIST: (pid: number) => ['comment', 'list', pid],
  },
  PAPER: {
    LIST: (labId: number) => ['paper', 'list', labId],
    DETAIL: (labId: number, paperId: number) => ['paper', 'detail', labId, paperId],
  },
  TASK: {
    LIST: ['task', 'list'],
    WORKS_ALL_LIST: (labId: number) => ['task', 'works-all-list', labId],
  },
}
