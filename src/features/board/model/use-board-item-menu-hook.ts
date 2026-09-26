import { useMutation } from '@tanstack/react-query'
import { deleteBoardItem } from '../api/delete-board-item'

export const useBoardItemMenuHook = () => {
  const deleteBoardItemMutation = useMutation({
    mutationFn: deleteBoardItem,
    onSuccess: () => {
      console.log('소식이 성공적으로 삭제되었습니다.')
    },
    onError: () => {
      console.log('소식 삭제에 실패했습니다.')
    },
  })

  const handleDeleteBoardItem = (pId: number) => {
    deleteBoardItemMutation.mutate(pId)
  }

  return {
    handleDeleteBoardItem,
    isDeletePending: deleteBoardItemMutation.isPending,
  }
}
