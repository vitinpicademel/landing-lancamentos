import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Donna Negociações Imobiliárias - Encontre seu Imóvel dos Sonhos',
  description: 'As melhores opções de imóveis para compra e aluguel em Uberaba',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
} 