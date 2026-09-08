import { beforeEach, describe, expect, it, vi } from 'vitest'
import { FileService } from '@/services/file-service'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const mockFile = new File(['conteudo'], 'file.pdf', {
  type: 'application/pdf',
})

describe('FileService', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  describe('upload', () => {
    it('should make a POST request to /s3-aws with the file inside a FormData', async () => {
      const mockResponse = { payload: 'file.pdf' }
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await FileService.upload({ file: mockFile })

      expect(fetch).toHaveBeenCalledTimes(1)
      const [url, options] = vi.mocked(fetch).mock.calls[0]
      expect(url).toBe(`${API_URL}/s3-aws`)
      expect(options?.method).toBe('POST')
      expect(options?.body).toBeInstanceOf(FormData)
      expect((options?.body as FormData).get('file')).toBe(mockFile)

      expect(result).toEqual(mockResponse)
    })

    it('should throw an error when the response is not ok', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
      } as Response)

      await expect(FileService.upload({ file: mockFile })).rejects.toThrow(
        'Erro ao salvar o arquivo.',
      )
    })
  })

  describe('get', () => {
    it('should make a GET request to /s3-aws with the key in the query string', async () => {
      const mockResponse = {
        payload: 'https://bucket.s3.amazonaws.com/file.pdf',
      }
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await FileService.get({ key: 'file.pdf' })

      expect(fetch).toHaveBeenCalledWith(`${API_URL}/s3-aws?key=file.pdf`, {
        method: 'GET',
      })
      expect(result).toEqual(mockResponse)
    })

    it('should throw an error when the response is not ok', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
      } as Response)

      await expect(FileService.get({ key: 'file.pdf' })).rejects.toThrow(
        'Erro ao buscar o arquivo.',
      )
    })
  })

  describe('delete', () => {
    it('should make a DELETE request to /s3-aws with the key in the query string', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
      } as Response)

      const result = await FileService.delete({ key: 'file.pdf' })

      expect(fetch).toHaveBeenCalledWith(`${API_URL}/s3-aws?key=file.pdf`, {
        method: 'DELETE',
      })
      expect(result).toBeUndefined()
    })

    it('should throw an error when the response is not ok', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
      } as Response)

      await expect(FileService.delete({ key: 'file.pdf' })).rejects.toThrow(
        'Erro ao deletar o arquivo.',
      )
    })
  })
})
