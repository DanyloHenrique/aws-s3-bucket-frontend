import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fileStorage, type StoredFile } from '@/lib/file-storage'

const FILE_STORAGE_KEY = 'aws-s3-bucket/'

describe('fileStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('fetch', () => {
    it('should return an empty array when there is nothing saved', () => {
      expect(fileStorage.fetch()).toEqual([])
    })

    it('should return the saved items correctly', () => {
      const data: StoredFile[] = [{ key: 'file1.pdf', userName: 'Danylo' }]
      localStorage.setItem(FILE_STORAGE_KEY, JSON.stringify(data))

      expect(fileStorage.fetch()).toEqual(data)
    })

    it('should return an empty array if the saved JSON is corrupted', () => {
      localStorage.setItem(FILE_STORAGE_KEY, '{invalid-json')

      expect(fileStorage.fetch()).toEqual([])
    })

    it('should return an empty array if the saved value is not an array', () => {
      localStorage.setItem(FILE_STORAGE_KEY, JSON.stringify({ foo: 'bar' }))

      expect(fileStorage.fetch()).toEqual([])
    })
  })

  describe('save', () => {
    it('should save the first item correctly', () => {
      fileStorage.save({ key: 'file1.pdf', userName: 'Danylo' })

      expect(fileStorage.fetch()).toEqual([
        { key: 'file1.pdf', userName: 'Danylo' },
      ])
    })

    it('should add a new item while keeping existing items', () => {
      fileStorage.save({ key: 'file1.pdf', userName: 'Danylo' })
      fileStorage.save({ key: 'file2.png', userName: 'Emily' })

      expect(fileStorage.fetch()).toEqual([
        { key: 'file1.pdf', userName: 'Danylo' },
        { key: 'file2.png', userName: 'Emily' },
      ])
    })
  })

  describe('remove', () => {
    beforeEach(() => {
      fileStorage.save({ key: 'file1.pdf', userName: 'Danylo' })
      fileStorage.save({ key: 'file2.png', userName: 'Emily' })
    })

    it('should remove only the item with the corresponding key', () => {
      fileStorage.remove('file1.pdf')

      expect(fileStorage.fetch()).toEqual([
        { key: 'file2.png', userName: 'Emily' },
      ])
    })

    it('should not alter the list if the key does not exist', () => {
      fileStorage.remove('inexistente.pdf')

      expect(fileStorage.fetch()).toHaveLength(2)
    })

    it('should remove all occurrences if there are duplicate keys', () => {
      // fileStorage.save não faz dedupe hoje, então duas entradas
      // com a mesma key são possíveis — vale garantir o comportamento.
      fileStorage.save({ key: 'file1.pdf', userName: 'Outro Usuario' })

      fileStorage.remove('file1.pdf')

      expect(fileStorage.fetch()).toEqual([
        { key: 'file2.png', userName: 'Emily' },
      ])
    })
  })

  describe('clear', () => {
    it('should remove all saved items', () => {
      fileStorage.save({ key: 'file1.pdf', userName: 'Danylo' })

      fileStorage.clear()

      expect(fileStorage.fetch()).toEqual([])
    })
  })
})