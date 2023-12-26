import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { NextAuthProvider } from '@/components/Provider/Provider'
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'News-Article',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>


        <NextAuthProvider>
          <div className="lg:max-w-[900px] lg:px-16 mx-auto py-8 shadow-xl min-h-screen flex flex-col px-8 ">

            <Navbar />

            <div className="flex-auto">

              {children}
            </div>

            <Footer />

          </div>
          <Toaster />
        </NextAuthProvider>


      </body>
    </html>
  )
}
