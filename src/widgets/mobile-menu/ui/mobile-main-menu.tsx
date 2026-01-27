'use client'

import type { LabType } from '@/shared/constant/nav'
import { MOBILE_MAIN_NAV } from '@/shared/constant/nav'
import { MobileMenuItem } from '@/widgets/mobile-menu/ui/mobile-main-menu-item'

interface MobileMenuProps {
  type: 'home' | 'member' | 'notice'
  onMenuClick: (labType: LabType) => void
}

export const MobileMainMenu = ({ onMenuClick, type }: MobileMenuProps) => {
  return (
    <aside className={'flex gap-[10px]'}>
      {Object.entries(MOBILE_MAIN_NAV).map(([key, item]) => (
        <MobileMenuItem
          key={key}
          type={type}
          itemType={item.VALUE as LabType}
          onMenuClick={() => onMenuClick(item.VALUE as LabType)}
        >
          {item.NAME}
        </MobileMenuItem>
      ))}
    </aside>
  )
}
