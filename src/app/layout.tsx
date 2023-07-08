import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import Session from '@/context/session-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '10tips',
  description: 'Get advice',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body className={"dark:bg-black bg-white text-black dark:text-white min-h-screen"}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Session>
          <Navbar/>
          <div className="flex min-h-screen flex-col items-center justify-between p-24">
            {children}
          </div>
        </Session>
        </ThemeProvider>
      </body>
    </html>
  )
}
