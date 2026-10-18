export const isRoleTag = (role: UserRoleType) => {
  return role === 'LAB_LEADER' || role === 'SUB_LEADER'
}

export const isProfessorOrLabLeader = (role: UserRoleType) => {
  return role === 'PROFESSOR' || role === 'LAB_LEADER'
}

export const isSubLeaderOrMember = (role: UserRoleType) => {
  return role === 'SUB_LEADER' || role === 'MEMBER'
}
