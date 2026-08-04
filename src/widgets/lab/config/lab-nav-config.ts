import { SideData } from '../ui/side/side-data'
import { SideManagement } from '../ui/side/side-management'
import { SideMember } from '../ui/side/side-member'
import { SideNotice } from '../ui/side/side-notice'
import { SideRental } from '../ui/side/side-rental'
import { SideRequest } from '../ui/side/side-request'
import { SideWeek } from '../ui/side/side-week'
import { SideWork } from '../ui/side/side-work'
import DataIcon from '@/../public/icon/icon_main_data.svg'
import ManagementIcon from '@/../public/icon/icon_main_management.svg'
import MemberIcon from '@/../public/icon/icon_main_member.svg'
import NoticeIcon from '@/../public/icon/icon_main_notice.svg'
import PostIcon from '@/../public/icon/icon_main_post.svg'
import RentalIcon from '@/../public/icon/icon_main_rental.svg'
import WeekIcon from '@/../public/icon/icon_main_week.svg'
import WorkingIcon from '@/../public/icon/icon_main_work.svg'

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
