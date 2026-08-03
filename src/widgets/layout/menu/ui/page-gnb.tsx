'use client'

import { useRouter } from 'next/dist/client/components/navigation'
import { PageGnbItem } from './page-gnb-item'
import { GNB_ITEM } from '@/shared/constant/nav'

export const PageGnb = () => {
  const router = useRouter()
  return (
    <aside
      className={
        'fixed z-10 h-full rounded-tr-[24px] rounded-br-[24px] bg-white px-5 pt-7.5 shadow-[0px_1px_3px_rgba(0,0,0,0.03),0px_4px_16px_rgba(0,0,0,0.04)]'
      }
    >
      <ul className={'flex flex-col gap-6'}>
        {GNB_ITEM.map(({ name, path, Icon }) => (
          <PageGnbItem key={name} itemName={name} path={path} onItemClick={() => router.push(path)}>
            <Icon />
          </PageGnbItem>
        ))}
      </ul>
    </aside>
  )
}
