import { usePathname } from 'next/dist/client/components/navigation'
import { Text } from '@/shared/ui/text'

interface Props {
  path: string
  device?: 'pc' | 'mobile'
  onItemClick: () => void
  children: React.ReactNode
  itemName: '연구실' | '캘린더' | '게시판' | '업무' | '더보기'
}

export const PageGnbItem = ({ device = 'pc', onItemClick, children, itemName, path }: Props) => {
  const iconWidth = device === 'pc' ? 'h-6 w-6' : 'h-5 w-5'
  const textSize = device === 'pc' ? 'text-[12px]' : 'text-[10px]'
  const currentPath = usePathname() !== '/' ? usePathname() : '/home'
  const itemPath = path === '/' ? '/home' : path
  const isActive = currentPath === itemPath || currentPath.startsWith(itemPath)

  return (
    <li
      className={`flex cursor-pointer flex-col items-center justify-center gap-1.25 ${device === 'mobile' && 'flex-1'}`}
      onClick={onItemClick}
    >
      <div className={`${isActive ? 'text-gray-900' : 'text-gray-400'} ${iconWidth}`}>{children}</div>
      <Text className={`${isActive ? 'text-gray-900' : 'text-gray-400'} ${textSize} font-semibold`}>{itemName}</Text>
    </li>
  )
}
