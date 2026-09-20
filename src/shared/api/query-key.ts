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
  },
  BOARD: {
    CATEGORY: (labId: number) => ['board', 'category', labId],
    LIST: (categoryId: number) => ['board', 'list', categoryId],
  },
  COMMENT: {
    LIST: (pid: number) => ['comment', 'list', pid],
  },
}
