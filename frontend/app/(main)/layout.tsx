'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Sidebar } from '@/components/sidebar'
import { AuthProvider, useAuth } from '@/context/AuthContext'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import GifLoader from '@/components/loader'

const inter = Inter({ subsets: ['latin'] })


interface ProtectedLayoutProps {
  children: React.ReactNode;
}

// A component that checks authentication and redirects if not logged in.
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {

  return <>{children}</>;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <AuthProvider>
      <ProtectedLayout>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex">
            <Sidebar />
            <main className="flex-1 ml-28 flex justify-center ">{children}</main>
          </div>
        </ThemeProvider>
        </ProtectedLayout>
    </AuthProvider>
      </body>
    </html>
  )
}