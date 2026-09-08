import { useMutation, useQueryClient } from '@tanstack/react-query'
import { fileStorage } from '@/lib/file-storage'
import { FileService } from '@/services/file-service'

export const useDeleteFile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: { key: string }) => FileService.delete(payload),
    onSuccess: (_data, variables) => {
      console.log('onSuccess do useDeleteFile disparou', variables)

      fileStorage.remove(variables.key)
      queryClient.invalidateQueries({ queryKey: ['files'] })
    },
    onError: (error) => {
      console.log('onError do useDeleteFile', error)
    },
  })
}
