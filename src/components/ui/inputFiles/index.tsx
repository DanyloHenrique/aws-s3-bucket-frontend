import { Upload } from 'lucide-react'
import type { ChangeEvent } from 'react'

type InputFilesProps = {
  nameInput: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  fileName?: string
}

export const InputFiles = ({
  nameInput,
  onChange,
  required,
  fileName,
}: InputFilesProps) => {
  return (
    <label
      htmlFor={nameInput}
      className="my-2 w-full cursor-pointer rounded-lg border-2 border-primary-700 border-dashed bg-neutral-800 px-4 py-14 text-heading text-lg text-neutral-500 shadow-xs transition-colors hover:border-primary-500 hover:bg-zinc-800 hover:text-neutral-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary-500 has-[:focus-visible]:outline-offset-2"
    >
      <div className="wrap-break-word pointer-events-none flex flex-col items-center overflow-hidden text-center">
        {fileName ? (
          <p>{fileName}</p>
        ) : (
          <>
            <Upload />
            <p className="mt-2 mb-4">Clique para Upload ou arraste e solte</p>
            <p className="text-base">
              PDF, PNG ou JPG <br /> (Tamanho máximo do arquivo: 5 MB){' '}
            </p>
          </>
        )}
      </div>

      <input
        onChange={onChange}
        name={nameInput}
        id={nameInput}
        required={required}
        type="file"
        accept=".pdf, .jpg, .jpeg, .png"
        aria-describedby={`${nameInput}_help`}
        className="peer sr-only"
      />
    </label>
  )
}
