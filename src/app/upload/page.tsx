'use client'

import { useRouter } from 'next/navigation'
import { type ChangeEvent, useState } from 'react'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import { InputFiles } from '@/components/ui/inputFiles'

import { useUploadFile } from '@/hooks/UseUploadFile'

export default function UploadPage() {
  const router = useRouter()

  const [file, setFile] = useState<File | null>(null)
  const [userName, setUserName] = useState<string>('')

  const { mutate, isPending } = useUploadFile()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target.files?.[0]
    if (fileInput) setFile(fileInput)
  }

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      alert('Nenhum arquivo selecionado!')
      return
    }

    mutate(
      { payload: { file }, userName },
      {
        onSuccess: () => {
          router.push('/')
        },
      },
    )
  }

  return (
    <>
      <Header title="Upload S3" back onBack={() => router.push('/')} />
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center font-sans">
        <div className="mb-8">
          <h2 className="font-bold text-3xl text-primary-500 decoration-1">
            Salvar Arquivo no Sistema
          </h2>
          <p>
            Armazene seus arquivos através de um armazenamento seguro na nuvem
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          method="post"
          className="flex h-fit w-full flex-col items-center gap-4 rounded border border-surface bg-surface px-6 py-4 text-left transition-all hover:border-foreground"
        >
          <Input
            label="Seu nome"
            placeholder="Nome Sobrenome"
            name={userName}
            onChange={handleUserNameChange}
            required
          />

          <InputFiles
            nameInput="file"
            onChange={handleFileChange}
            required
            fileName={file?.name}
          />

          <Button isLoading={isPending} type="submit">
            <p>Enviar arquivo</p>
          </Button>
        </form>
      </main>
    </>
  )
}
