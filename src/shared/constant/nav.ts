import { ROUTES } from '@/shared/constant/routes'
import type { ComponentType, SVGProps } from 'react'
import BoardIcon from '@/../public/icon/icon_gnb_board.svg'
import CalenderIcon from '@/../public/icon/icon_gnb_calendar.svg'
import EtcIcon from '@/../public/icon/icon_gnb_etc.svg'
import LabIcon from '@/../public/icon/icon_gnb_lab.svg'
import WorkIcon from '@/../public/icon/icon_gnb_work.svg'

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>
type SideMenuName = '연구실' | '캘린더' | '게시판' | '업무' | '더보기'

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
