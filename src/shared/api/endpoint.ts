export const ENDPOINTS = {
  USERS: {
    ROOT: '/api/users/me',
    PASSWORD: '/api/users/me/password',
  },
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    VERIFY_EMAIL: '/api/auth/verify-email',
    RESEND_VERIFICATION: '/api/auth/resend-verification',
    REFRESH: '/api/auth/refresh',
  },
  LABS: {
    CREATE: '/api/labs',
    INVITE_CODES: (labId: number) => `/api/labs/${labId}/invite-codes`,
    REVOKE_INVITE_CODES: (labId: number, code: string) => `/api/labs/${labId}/revoke-invite-codes/${code}`,
    CHK_VALIDATE: (code: string) => `/api/labs/invite-codes/chk-validate/${code}`,
    JOIN: `/api/labs/join`,
    MEMBERS: (labId: number) => `/api/labs/${labId}/members`,
    CHANGE_ROLE: (labId: number, userId: number) => `/api/labs/${labId}/members/${userId}/change-role`,
  },
  BOARD: {
    CATEGORY: (labId: number) => `/api/board/${labId}/category`,
    CATEGORY_ID: (categoryId: number) => `/api/board/${categoryId}`,
    BOARD_PID: (pid: number) => `/api/board/${pid}`,
  },
  COMMENT: {
    ROOT: (pid: number) => `/api/comment/${pid}`,
  },
}
