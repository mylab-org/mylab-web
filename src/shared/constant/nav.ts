import { ROUTES } from '@/shared/constant/routes'
import type { ComponentType, SVGProps } from 'react'
import BoardIcon from '@/../public/icon/board.svg'
import CalenderIcon from '@/../public/icon/calendar.svg'
import LabIcon from '@/../public/icon/lab.svg'
import UserIcon from '@/../public/icon/user.svg'
import WorkIcon from '@/../public/icon/work.svg'

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>
type SideMenuName = '연구실' | '캘린더' | '게시판' | '업무' | '내 정보'
export type LabType = 'home' | 'member' | 'notice'

export const MOBILE_MAIN_NAV = {
  HOME: {
    NAME: '홈 화면',
    VALUE: 'home',
  },
  MEMBER: {
    NAME: '연구실 인원',
    VALUE: 'member',
  },
  NOTICE: {
    NAME: '공지사항',
    VALUE: 'notice',
  },
}

export const SIDEMENU_ITEM: { name: SideMenuName; path: string; Icon: SvgIcon }[] = [
  {
    name: '연구실',
    path: ROUTES.HOME,
    Icon: LabIcon,
  },
  {
    name: '캘린더',
    path: ROUTES.CALENDAR.ROOT,
    Icon: CalenderIcon,
  },
  {
    name: '게시판',
    path: '/board',
    Icon: BoardIcon,
  },
  {
    name: '업무',
    path: ROUTES.WORKS.ROOT,
    Icon: WorkIcon,
  },
  {
    name: '내 정보',
    path: ROUTES.USER.ROOT,
    Icon: UserIcon,
  },
]
