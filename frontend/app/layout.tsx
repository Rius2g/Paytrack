import './globals.css'
import * as React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Nunito } from 'next/font/google';


export const metadata = {
  title: 'Paytrack',
  description: 'A Rius2g project',
}

const font = Nunito({
  subsets: ['latin']
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en" className='dark'>
        <div className='dark'>
        <body className={font.className}>
          <Navbar/>
          <div className="pt-36" >
          {children}
          </div>
        </body>
        </div>
      </html>
    )
}
