import { useMutation, useQueryClient } from '@tanstack/react-query'
import { fileStorage } from '@/lib/file-storage'
import { FileService, type UploadDataPayload } from '@/services/file-service'

type UploadFileVariables = {
  payload: UploadDataPayload
  userName: string
}

export const useUploadFile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ payload }: UploadFileVariables) =>
      FileService.upload(payload),
    onSuccess: (data, variables) => {
      console.log('Arquivo salvo com sucesso:', data)
      fileStorage.save({
        key: data.payload,
        userName: variables.userName,
      })
      queryClient.invalidateQueries({ queryKey: ['files'] })
    },
  })
}
