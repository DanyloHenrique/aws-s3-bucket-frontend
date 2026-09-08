'use client'
export type StoredFile = {
  key: string
  userName: string
}

const isBrowser = typeof window !== 'undefined'

const FILE_STORAGE_KEY = 'aws-s3-bucket/'

export const fileStorage = {
  save: (data: StoredFile) => {
    const current = fileStorage.fetch()
    const updated = [...current, data]
    localStorage.setItem(FILE_STORAGE_KEY, JSON.stringify(updated))
  },

  fetch: (): StoredFile[] => {
    if (!isBrowser) return []

    const raw = localStorage.getItem(FILE_STORAGE_KEY)
    if (!raw) return []
    try {
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  },

  remove: (key: string) => {
    const current = fileStorage.fetch()
    console.log('key recebida:', key)
    console.log(
      'keys salvas:',
      current.map((item) => item.key),
    )

    const updated = current.filter((item) => item.key !== key)
    console.log('sobrou:', updated.length, 'de', current.length)
    localStorage.setItem(FILE_STORAGE_KEY, JSON.stringify(updated))
  },

  clear: () => localStorage.removeItem(FILE_STORAGE_KEY),
}
