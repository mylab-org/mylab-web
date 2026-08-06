'use client'

import { LabMenuItem } from './lab-menu-item'
import { LAB_NAV, MOBILE_LAB_DETAIL_NAV } from '../../config/lab-nav-config'
import { useSideModalStore } from '@/shared/store/useSideModalStore'

export const LabMenuWrapper = ({ type }: { type: 'top' | 'center' }) => {
  const openSideModal = useSideModalStore(state => state.openSideModal)

  return (
    <div className={'flex gap-2.5 md:gap-7.5'}>
      {type === 'top'
        ? LAB_NAV.map(({ name, Icon, isAdmin, content }) => (
            <LabMenuItem key={name} name={name} onClick={() => openSideModal(content, name)}>
              <Icon className={'h-full w-full'} />
            </LabMenuItem>
          ))
        : MOBILE_LAB_DETAIL_NAV.map(({ name, Icon, content }) => (
            <LabMenuItem key={name} name={name} onClick={() => openSideModal(content, name)}>
              <Icon className={'h-full w-full'} />
            </LabMenuItem>
          ))}
    </div>
  )
}
