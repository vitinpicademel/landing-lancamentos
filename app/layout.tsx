import './globals.css'
import type { Metadata } from 'next'
import GoogleTagManager from './components/GoogleTagManager'

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
      <head>
        <GoogleTagManager />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NN6WXLBV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
} 