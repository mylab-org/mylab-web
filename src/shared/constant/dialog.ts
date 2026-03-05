export type DialogTypeKey = 'LAB_DELETE' | 'SERVICE_LEAVE'

export interface DialogType {
  title: string
  description: string
  etc?: string
}

export const DIALOG_MAP: Record<DialogTypeKey, DialogType> = {
  LAB_DELETE: {
    title: '연구실 나가기',
    description:
      '연구실 탈퇴 전, 데이터 백업이 이루어졌는지 확인해주세요.\n연구실 기록들은 연구의 지속성을 위해 탈퇴 이후에도 연구실 구성원들에 의해 조회가 가능합니다.',
  },
  SERVICE_LEAVE: {
    title: '회원 탈퇴',
    description:
      '회원 탈퇴를 진행하면 회원님의 모든 정보는 삭제됩니다.\n다만 서비스 내에서 활동한 연구실 기록들은 연구의 지속성을 위해 탈퇴 이후에도 연구실 구성원들에 의해 조회가 가능합니다.',
    etc: '(자유게시판 등 커뮤니티 활동 외 연구실 내 활동을 뜻함)',
  },
}
