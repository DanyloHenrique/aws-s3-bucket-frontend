import { useMutation } from '@tanstack/react-query'
import { FileService } from '@/services/file-service'

export const useDownloadFile = () => {
  return useMutation({
    mutationFn: (payload: { key: string }) => FileService.get(payload),
    onSuccess: (data) => {
      window.open(data.payload)
    },
  })
}
