export const ENDPOINTS = {
  USERS: {
    ROOT: '/api/users/me',
    PASSWORD: '/api/users/me/password',
    POSTS: '/api/users/me/posts',
    COMMENTED_POSTS: '/api/users/me/commented-posts',
    IN_PROGRESS: '/api/users/me/in-progress',
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
    DETAIL: (labId: number) => `/api/labs/${labId}`,
    LINKS: (labId: number) => `/api/labs/${labId}/links`,
    LINK_ID: (labId: number, linkId: number) => `/api/labs/${labId}/links/${linkId}`,
  },
  BOARD: {
    CATEGORY: (labId: number) => `/api/board/${labId}/category`,
    CATEGORY_ID: (categoryId: number) => `/api/board/${categoryId}`,
    BOARD_PID: (pid: number) => `/api/board/${pid}`,
    LIKE_PID: (pid: number) => `/api/board/${pid}/like`,
    DETAIL: (pid: number) => `/api/board/posts/${pid}`,
  },
  COMMENT: {
    ROOT: (id: number) => `/api/comment/${id}`,
  },
  // works (업무 관련)
  PAPER: {
    ROOT: (labId: number) => `/api/labs/${labId}/papers`,
    PAPER_ID: (labId: number, paperId: number) => `/api/labs/${labId}/papers/${paperId}`,
    STATUS: (labId: number, paperId: number) => `/api/labs/${labId}/papers/${paperId}/status`,
    MEMBERS: (labId: number, paperId: number) => `/api/labs/${labId}/papers/${paperId}/members`,
    MEMBER_USER_ID: (labId: number, paperId: number, memberUserId: number) =>
      `/api/labs/${labId}/papers/${paperId}/members/${memberUserId}`,
  },
  TASK: {
    ROOT: '/api/task',
    TASK_ID: (taskId: number) => `/api/task/${taskId}`,
    STATUS: (taskId: number) => `/api/task/${taskId}/status`,
    WORKS_ALL_LIST: (labId: number) => `/api/task/lab/${labId}`,
  },
  EQUIPMENT: {
    ROOT: (labId: number) => `/api/labs/${labId}/equipments`,
    EQUIPMENT_ID: (labId: number, equipmentId: number) => `/api/labs/${labId}/equipments/${equipmentId}`,
    RENTALS: (labId: number, equipmentId: number) => `/api/labs/${labId}/equipments/${equipmentId}/rentals`,
    RENTAL_ID: (labId: number, equipmentId: number, rentalId: number) =>
      `/api/labs/${labId}/equipments/${equipmentId}/rentals/${rentalId}`,
    MY_RENTALS: (labId: number) => `/api/labs/${labId}/rentals/me`,
    REQUESTS: (labId: number) => `/api/labs/${labId}/equipment-requests`,
    REQUEST_STATUS: (labId: number) => `/api/labs/${labId}/equipment-requests/status`,
    REQUEST_ID: (labId: number, requestId: number) => `/api/labs/${labId}/equipment-requests/${requestId}`,
  },
  CALENDAR: {
    ROOT: (labId: number) => `/api/labs/${labId}/calendar`,
    DATES: (labId: number) => `/api/labs/${labId}/calendar/dates`,
    SCHEDULE: (labId: number, scheduleId: number) => `/api/labs/${labId}/calendar/${scheduleId}`,
    OCCURRENCES: (labId: number, scheduleId: number) => `/api/labs/${labId}/calendar/${scheduleId}/occurrences`,
  },
}
