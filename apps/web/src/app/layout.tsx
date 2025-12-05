import '@workspace/ui/globals.css'
import { Providers } from '../components/providers'
import { Toaster } from 'sonner'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <main>{children}</main>
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  )
}
