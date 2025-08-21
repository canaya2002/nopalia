import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NOPAL - El Juego de Fiesta Definitivo',
  description: 'Un juego por Carlos Anaya Ruiz. El party game mexicano más divertido con 5 niveles de intensidad.',
  keywords: ['nopal', 'fiesta', 'party game', 'niveles', 'mexico', 'drinking game'],
  authors: [{ name: 'Carlos Anaya Ruiz' }],
  openGraph: {
    title: 'NOPAL - El Juego de Fiesta Definitivo',
    description: 'El party game mexicano más divertido con 5 niveles de intensidad.',
    type: 'website',
    locale: 'es_MX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOPAL - El Juego de Fiesta Definitivo',
    description: 'El party game mexicano más divertido con 5 niveles de intensidad.',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}