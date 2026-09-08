import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { FilesList } from '@/components/filesList'
import type { StoredFile } from '@/lib/file-storage'

const files: StoredFile[] = [
  { key: 'uploads/danylo/file1.pdf', userName: 'Danylo' },
  { key: 'uploads/emily/file2.png', userName: 'Emily' },
]

afterEach(() => {
  cleanup()
})

describe('FilesList', () => {
  it('should display a message when there are no files', () => {
    render(<FilesList files={[]} onDownload={vi.fn()} onDelete={vi.fn()} />)

    expect(screen.getByText('Sem arquivos salvos.')).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('should display the header and a row for each file', () => {
    render(<FilesList files={files} onDownload={vi.fn()} onDelete={vi.fn()} />)

    expect(screen.getByText('Nome do usuário')).toBeInTheDocument()
    expect(screen.getByText('Arquivo')).toBeInTheDocument()
    expect(screen.getByText('Ações')).toBeInTheDocument()

    expect(screen.getByText('Danylo')).toBeInTheDocument()
    expect(screen.getByText('Emily')).toBeInTheDocument()
  })

  it('should display only the file name, without the full path', () => {
    render(<FilesList files={files} onDownload={vi.fn()} onDelete={vi.fn()} />)

    expect(screen.getByText('file1.pdf')).toBeInTheDocument()
    expect(screen.getByText('file2.png')).toBeInTheDocument()
    expect(
      screen.queryByText('uploads/danylo/file1.pdf'),
    ).not.toBeInTheDocument()
  })

  it('should call onDownload with the correct key when clicking download', async () => {
    const user = userEvent.setup()
    const onDownload = vi.fn()

    render(
      <FilesList files={files} onDownload={onDownload} onDelete={vi.fn()} />,
    )

    await user.click(
      screen.getByRole('button', { name: 'Baixar arquivo de Danylo' }),
    )

    expect(onDownload).toHaveBeenCalledWith('uploads/danylo/file1.pdf')
    expect(onDownload).toHaveBeenCalledTimes(1)
  })

  it('should call onDelete with the correct key when clicking delete', async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()

    render(<FilesList files={files} onDownload={vi.fn()} onDelete={onDelete} />)

    await user.click(
      screen.getByRole('button', { name: 'Excluir arquivo de Emily' }),
    )

    expect(onDelete).toHaveBeenCalledWith('uploads/emily/file2.png')
    expect(onDelete).toHaveBeenCalledTimes(1)
  })

  it('should mark only the delete button for the file in isDeleting as "loading"  ', () => {
    render(
      <FilesList
        files={files}
        onDownload={vi.fn()}
        onDelete={vi.fn()}
        isDeleting="uploads/danylo/file1.pdf"
      />,
    )

    const deleteDanylo = screen.getByRole('button', {
      name: 'Excluir arquivo de Danylo',
    })
    const deleteEmily = screen.getByRole('button', {
      name: 'Excluir arquivo de Emily',
    })

    expect(deleteDanylo).toHaveAttribute('aria-busy', 'true')
    expect(deleteDanylo).toBeDisabled()

    expect(deleteEmily).toHaveAttribute('aria-busy', 'false')
    expect(deleteEmily).not.toBeDisabled()
  })

  it('should not mark any button as loading when isDeleting is null', () => {
    render(
      <FilesList
        files={files}
        onDownload={vi.fn()}
        onDelete={vi.fn()}
        isDeleting={null}
      />,
    )

    for (const name of [
      'Excluir arquivo de Danylo',
      'Excluir arquivo de Emily',
    ]) {
      expect(screen.getByRole('button', { name })).not.toBeDisabled()
    }
  })
})
