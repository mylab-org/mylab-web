'use client'

import { useRouter } from 'next/dist/client/components/navigation'
import { SIDEMENU_ITEM } from '@/shared/constant/nav'
import { SideListItem } from '@/widgets/sideMenu/ui/side-list-item'

export const MobileSideMenuBar = () => {
  const router = useRouter()
  return (
    <aside
      className={
        'border-gray100 fixed bottom-0 w-full rounded-t-[20px] border-t border-r border-l bg-white px-[10px] py-[7px]'
      }
    >
      <ul className={'flex w-full items-center justify-around'}>
        {SIDEMENU_ITEM.map(({ name, path, Icon }) => (
          <SideListItem device={'mobile'} itemName={name} path={path} onItemClick={() => router.push(path)}>
            <Icon />
          </SideListItem>
        ))}
      </ul>
    </aside>
  )
}
