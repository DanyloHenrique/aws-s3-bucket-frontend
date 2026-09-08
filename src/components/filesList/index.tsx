import { AlertCircle, Download, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { StoredFile } from '@/lib/file-storage'

type FileListProps = {
  files: StoredFile[]
  onDownload: (key: string) => void
  onDelete: (key: string) => void
  isDeleting?: string | null
}

export const FilesList = ({
  files,
  onDownload,
  onDelete,
  isDeleting,
}: FileListProps) => {
  const fileNameWithoutPath = (fileName: string) => {
    return fileName.split('/').pop()
  }

  if (files.length === 0) {
    return (
      <div className="flex w-fit items-center gap-2 border px-2 py-3">
        <AlertCircle
          aria-hidden="false"
          size={18}
          className="text-accent-500"
        />
        <p className="text-neutral-400">Sem arquivos salvos.</p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-2 overflow-hidden rounded-xl border-x border-x-zinc-700 border-b border-b-zinc-700">
      <li className="flex items-center justify-between rounded-base border-default border-b bg-primary-700 px-2 py-2 text-left text-body text-sm">
        <p className="w-1/6">Nome do usuário</p>
        <p className="w-2/6">Arquivo</p>
        <p className="w-2/6">Ações</p>
      </li>
      {files.map((file) => (
        <li
          key={file.key}
          className="wrap-break-word flex items-center justify-between border-neutral-700 border-b px-2 py-3"
        >
          <span className="w-1/6 truncate text-neutral-100">
            {file.userName}
          </span>

          <span className="block w-2/6 truncate text-neutral-100">
            {fileNameWithoutPath(file.key)}
          </span>

          <div className="flex w-2/6 items-center gap-4">
            <Button
              type="button"
              variant="primaryOutline"
              aria-label={`Baixar arquivo de ${file.userName}`}
              onClick={() => onDownload(file.key)}
            >
              <Download aria-hidden="true" size={18} />
            </Button>

            <Button
              type="button"
              variant="secondaryOutline"
              aria-label={`Excluir arquivo de ${file.userName}`}
              isLoading={isDeleting === file.key}
              onClick={() => onDelete(file.key)}
            >
              <Trash2 aria-hidden="true" size={18} />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
