import { usePathname } from 'next/dist/client/components/navigation'
import { P } from '@/shared/ui'

interface Props {
  path: string
  device?: 'pc' | 'mobile'
  onItemClick: () => void
  children: React.ReactNode
  itemName: '연구실' | '캘린더' | '게시판' | '업무' | '내 정보'
}

export const SideListItem = ({ device = 'pc', onItemClick, children, itemName, path }: Props) => {
  const iconWidth = device === 'pc' ? 'h-[24px] w-[24px]' : 'h-[20px] w-[20px]'
  const textSize = device === 'pc' ? 'text-[12px]' : 'text-[10px]'
  const currentPath = usePathname() !== '/' ? usePathname() : '/home'
  const itemPath = path === '/' ? '/home' : path
  const isActive = currentPath === itemPath || currentPath.startsWith(itemPath)

  return (
    <li
      className={`flex cursor-pointer flex-col items-center justify-center gap-[5px] ${device === 'mobile' && 'flex-1'}`}
      onClick={onItemClick}
    >
      <div className={`${isActive ? 'text-gray900!' : 'text-gray400!'} ${iconWidth}`}>{children}</div>
      <P className={`${isActive ? 'text-gray900!' : 'text-gray400!'} ${textSize} font-semibold`}>{itemName}</P>
    </li>
  )
}
