'use client'

import { Ellipsis } from 'lucide-react'
import { useWorksMoreMenuDeleteHook } from '../model/use-works-more-menu-delete-hook'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/override/dropdown-menu'
import type { QueryKey } from '@tanstack/react-query'

type DeleteConfig = {
  mutationFn: () => Promise<unknown>
  confirmMessage: string
  successMessage: string
  defaultErrorMessage: string
  invalidateQueryKeys: QueryKey[]
  onSuccess?: () => void
}

interface Props {
  onEdit: () => void
  deleteConfig: DeleteConfig
}

export const WorksMoreMenu = ({ onEdit, deleteConfig }: Props) => {
  const { handleDelete } = useWorksMoreMenuDeleteHook(deleteConfig)

  return (
    // 메뉴를 닫으면서 Confirm(Dialog)을 바로 열 때 body pointer-events가 잠기지 않도록 modal 해제
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className={'shrink-0 cursor-pointer rounded-[8px] p-1 outline-none hover:bg-gray-100'}>
        <Ellipsis strokeWidth={2} className={'size-5'} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'}>
        <DropdownMenuItem onSelect={onEdit}>수정</DropdownMenuItem>
        <DropdownMenuItem variant={'destructive'} onSelect={handleDelete}>
          삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
