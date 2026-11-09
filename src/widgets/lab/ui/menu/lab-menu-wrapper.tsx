'use client'

import { LabMenuItem } from './lab-menu-item'
import { LAB_NAV } from '../../config/lab-nav-config'
import { useUsersMeHook } from '@/entities/user'
import { isProfessorOrLabLeader } from '@/shared/lib/lab'
import { useSideModalStore } from '@/shared/store/useSideModalStore'

const TOP_ROW_NAMES = new Set(['공지사항', '연구 자료'])

export const LabMenuWrapper = () => {
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const { me } = useUsersMeHook()
  const canManage = me ? isProfessorOrLabLeader(me.lab.role) : false

  const items = LAB_NAV.filter(item => !item.isAdmin || canManage)
  const topItems = items.filter(item => TOP_ROW_NAMES.has(item.name))
  const bottomItems = items.filter(item => !TOP_ROW_NAMES.has(item.name))

  return (
    <>
      {/* 좁은 화면: 1행 */}
      <div className={'flex w-full gap-2 md:gap-2.5 xl:hidden'}>
        {items.map(({ name, Icon, content }) => (
          <LabMenuItem key={name} name={name} compact onClick={() => openSideModal(content, name)}>
            <Icon className={'h-full w-full'} />
          </LabMenuItem>
        ))}
      </div>

      {/* 넓은 화면(사용자 정보 옆): 2행 */}
      <div className={'hidden w-full max-w-[460px] shrink-0 flex-col justify-center gap-2.5 xl:flex'}>
        <div className={'flex flex-1 gap-2.5'}>
          {topItems.map(({ name, Icon, content }) => (
            <LabMenuItem key={name} name={name} compact onClick={() => openSideModal(content, name)}>
              <Icon className={'h-full w-full'} />
            </LabMenuItem>
          ))}
        </div>
        <div className={'flex flex-1 gap-2.5'}>
          {bottomItems.map(({ name, Icon, content }) => (
            <LabMenuItem key={name} name={name} compact onClick={() => openSideModal(content, name)}>
              <Icon className={'h-full w-full'} />
            </LabMenuItem>
          ))}
        </div>
      </div>
    </>
  )
}
