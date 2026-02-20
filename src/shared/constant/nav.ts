import { ROUTES } from '@/shared/constant/routes'
import type { ComponentType, SVGProps } from 'react'
import BoardIcon from '@/../public/icon/board.svg'
import CalenderIcon from '@/../public/icon/calendar.svg'
import DataIcon from '@/../public/icon/icon_main_data.svg'
import ManagementIcon from '@/../public/icon/icon_main_management.svg'
import NoticeIcon from '@/../public/icon/icon_main_notice.svg'
import PostIcon from '@/../public/icon/icon_main_post.svg'
import RentalIcon from '@/../public/icon/icon_main_rental.svg'
import EtcIcon from '@/../public/icon/icon_side_etc.svg'
import LabIcon from '@/../public/icon/lab.svg'
import WorkIcon from '@/../public/icon/work.svg'

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>
type SideMenuName = '연구실' | '캘린더' | '게시판' | '업무' | '더보기'
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

export const LAB_NAV = [
  {
    name: '공지사항',
    Icon: NoticeIcon,
    isAdmin: false,
  },
  {
    name: '비품 관리',
    Icon: ManagementIcon,
    isAdmin: true,
  },
  {
    name: '비품 대여',
    Icon: RentalIcon,
    isAdmin: false,
  },
  {
    name: '비품 신청',
    Icon: PostIcon,
    isAdmin: false,
  },
  {
    name: '연구 자료',
    Icon: DataIcon,
    isAdmin: false,
  },
]

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
    name: '더보기',
    path: ROUTES.USER.ROOT,
    Icon: EtcIcon,
  },
]
