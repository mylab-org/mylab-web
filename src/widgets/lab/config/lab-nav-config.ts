import { SideData } from '../ui/side/side-data'
import { SideManagement } from '../ui/side/side-management'
import { SideNotice } from '../ui/side/side-notice'
import { SideRental } from '../ui/side/side-rental'
import { SideRequest } from '../ui/side/side-request'
import DataIcon from '@/../public/icon/icon_main_data.svg'
import ManagementIcon from '@/../public/icon/icon_main_management.svg'
import NoticeIcon from '@/../public/icon/icon_main_notice.svg'
import PostIcon from '@/../public/icon/icon_main_post.svg'
import RentalIcon from '@/../public/icon/icon_main_rental.svg'

export const LAB_NAV = [
  {
    name: '공지사항',
    Icon: NoticeIcon,
    isAdmin: false,
    content: SideNotice,
  },
  {
    name: '연구 자료',
    Icon: DataIcon,
    isAdmin: false,
    content: SideData,
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
]
