'use client'

import { useRouter } from 'next/dist/client/components/navigation'
import { SIDEMENU_ITEM } from '@/shared/constant/nav'
import { SideListItem } from '@/widgets/sideMenu/ui/side-list-item'

export const SideMenuBar = () => {
  const router = useRouter()
  return (
    <aside className={'fixed z-10 h-full rounded-tr-[24px] rounded-br-[24px] bg-white px-[20px] pt-[30px]'}>
      <ul className={'flex flex-col gap-[24px]'}>
        {SIDEMENU_ITEM.map(({ name, path, Icon }) => (
          <SideListItem itemName={name} path={path} onItemClick={() => router.push(path)}>
            <Icon />
          </SideListItem>
        ))}
      </ul>
    </aside>
  )
}
