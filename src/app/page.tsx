'use client'

import { ArrowRightCircleIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { FilesList } from '@/components/filesList'
import { Header } from '@/components/header'
import Input from '@/components/ui/input'
import { Link } from '@/components/ui/link'

import { useDeleteFile } from '@/hooks/UseDeleteFile'
import { useDownloadFile } from '@/hooks/UseDownloadFile'
import { fileStorage, type StoredFile } from '@/lib/file-storage'

export default function Home() {
  const [dataFiles, setDataFiles] = useState<StoredFile[]>([
    // { key: '1', userName: 'emily' },
    // { key: '2', userName: 'danylo' },
    // { key: '3', userName: 'emily' },
  ])
  const [search, setSearch] = useState('')

  const { mutate: deleteFile, variables, isPending } = useDeleteFile()
  const { mutate: downloadFile } = useDownloadFile()

  useEffect(() => {
    setDataFiles(fileStorage.fetch())
  }, [])

  const filteredFiles = useMemo(() => {
    if (!search.trim()) return dataFiles

    return dataFiles.filter((file) =>
      file.userName.toLowerCase().includes(search.trim().toLowerCase()),
    )
  }, [dataFiles, search])

  const isDeleting = isPending ? variables?.key : null
  const handleDelete = (key: string) => {
    deleteFile(
      { key },
      {
        onSuccess: () => setDataFiles(fileStorage.fetch()),
      },
    )
  }

  const handleDownload = (key: string) => {
    downloadFile({ key })
  }

  return (
    <>
      <Header title="Upload S3" />

      <h1 className="mx-auto mt-4 font-bold text-3xl text-white tracking-tight">
        Salve arquivos em um bucket da AWS
      </h1>
      <main className="mx-auto flex w-9/10 flex-col gap-8">
        <div className="mt-6 max-w-sm">
          <Input
            type="search"
            placeholder="Pesquisar por nome..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Pesquisar arquivo por nome do usuário"
          />
        </div>

        <FilesList
          files={filteredFiles}
          onDelete={handleDelete}
          onDownload={handleDownload}
          isDeleting={isDeleting}
        />
        <Link href={`upload`} className="group">
          Enviar novo arquivo
          <ArrowRightCircleIcon className="translate-x-2 transition-transform group-hover:translate-x-3" />
        </Link>
      </main>
    </>
  )
}
