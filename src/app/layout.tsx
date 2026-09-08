import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { ReactQueryClientProvider } from '@/contexts/ReactQueryClientProvider'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'App Testing AWS S3',
  description: 'Criado para testar deploy in service EC2 in AWS',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <ReactQueryClientProvider>
      <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
        <body className="flex min-h-full flex-col">{children}</body>
      </html>
    </ReactQueryClientProvider>
  )
}
