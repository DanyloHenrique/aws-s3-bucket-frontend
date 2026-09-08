const API_URL = process.env.NEXT_PUBLIC_API_URL

export type UploadDataPayload = {
  file: File
}

export const FileService = {
  async upload({ file }: UploadDataPayload): Promise<{ payload: string }> {
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch(`${API_URL}/s3-aws`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Erro ao salvar o arquivo.')
    }

    return response.json()
  },

  async get({ key }: { key: string }): Promise<{ payload: string }> {
    const response = await fetch(`${API_URL}/s3-aws?key=${key}`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error('Erro ao buscar o arquivo.')
    }

    return response.json()
  },

  async delete({ key }: { key: string }) {
    const response = await fetch(`${API_URL}/s3-aws?key=${key}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Erro ao deletar o arquivo.')
    }

    return
  },
}
