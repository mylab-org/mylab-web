import { ROUTES } from '@/shared/constant/routes'
import {
  SideNotice,
  SideRental,
  SideRequest,
  SideManagement,
  SideData,
  SideWeek,
  SideWork,
  SideMember,
} from '@/widgets/lab-side-content'
import type { ComponentType, SVGProps } from 'react'
import BoardIcon from '@/../public/icon/board.svg'
import CalenderIcon from '@/../public/icon/calendar.svg'
import DataIcon from '@/../public/icon/icon_main_data.svg'
import ManagementIcon from '@/../public/icon/icon_main_management.svg'
import MemberIcon from '@/../public/icon/icon_main_member.svg'
import NoticeIcon from '@/../public/icon/icon_main_notice.svg'

import PostIcon from '@/../public/icon/icon_main_post.svg'
import RentalIcon from '@/../public/icon/icon_main_rental.svg'

import WeekIcon from '@/../public/icon/icon_main_week.svg'
import WorkingIcon from '@/../public/icon/icon_main_work.svg'
import EtcIcon from '@/../public/icon/icon_side_etc.svg'
import LabIcon from '@/../public/icon/lab.svg'
import WorkIcon from '@/../public/icon/work.svg'

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>
type SideMenuName = '연구실' | '캘린더' | '게시판' | '업무' | '더보기'

export const LAB_NAV = [
  {
    name: '공지사항',
    Icon: NoticeIcon,
    isAdmin: false,
    content: SideNotice,
  },
  {
    name: '비품 관리',
    Icon: ManagementIcon,
    isAdmin: true,
    content: SideManagement,
  },
  {
    name: '비품 대여',
    Icon: RentalIcon,
    isAdmin: false,
    content: SideRental,
  },
  {
    name: '비품 신청',
    Icon: PostIcon,
    isAdmin: false,
    content: SideRequest,
  },
  {
    name: '연구 자료',
    Icon: DataIcon,
    isAdmin: false,
    content: SideData,
  },
]

export const MOBILE_LAB_DETAIL_NAV = [
  {
    name: '주간 연구실 일정',
    Icon: WeekIcon,
    content: SideWeek,
  },
  {
    name: '진행 중인 업무 현황',
    Icon: WorkingIcon,
    content: SideWork,
  },
  {
    name: '연구실 구성원',
    Icon: MemberIcon,
    content: SideMember,
  },
]

export const GNB_ITEM: { name: SideMenuName; path: string; Icon: SvgIcon }[] = [
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
