'use client'

import { deleteWorksPaper } from '../api/delete-works-paper'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { TEST_LAB_ID } from '@/shared/constant/test'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import { useConfirmStore, useSideModalStore } from '@/shared/store'

type Props = {
  paperId: number
}

export const useWorksPaperMoreMenuHook = ({ paperId }: Props) => {
  const onOpenConfirm = useConfirmStore(state => state.onOpenConfirm)
  const closeSideModal = useSideModalStore(state => state.closeSideModal)

  const deleteWorksPaperMutation = useApiMutation({
    mutationFn: () => deleteWorksPaper(TEST_LAB_ID, paperId),
    successMessage: '논문이 삭제되었습니다.',
    defaultErrorMessage: '논문 삭제에 실패했습니다.',
    invalidateQueryKeys: [QUERY_KEYS.PAPER.LIST(TEST_LAB_ID)],
    onSuccess: () => closeSideModal(),
  })

  const handleDelete = () => {
    onOpenConfirm('정말 논문을 삭제하시겠습니까?', () => deleteWorksPaperMutation.mutate())
  }

  return {
    handleDelete,
  }
}
