'use client'

import { useApiMutation } from '@/shared/model/use-api-mutation'
import { useConfirmStore } from '@/shared/store'
import type { QueryKey } from '@tanstack/react-query'

type Props = {
  mutationFn: () => Promise<unknown>
  confirmMessage: string
  successMessage: string
  defaultErrorMessage: string
  invalidateQueryKeys: QueryKey[]
  onSuccess?: () => void
}

export const useWorksMoreMenuDeleteHook = ({
  mutationFn,
  confirmMessage,
  successMessage,
  defaultErrorMessage,
  invalidateQueryKeys,
  onSuccess,
}: Props) => {
  const onOpenConfirm = useConfirmStore(state => state.onOpenConfirm)

  const deleteMutation = useApiMutation({
    mutationFn,
    successMessage,
    defaultErrorMessage,
    invalidateQueryKeys,
    onSuccess,
  })

  const handleDelete = () => {
    onOpenConfirm(confirmMessage, () => deleteMutation.mutate())
  }

  return {
    handleDelete,
  }
}
