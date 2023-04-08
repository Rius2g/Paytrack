import './globals.css'
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
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        <div className="justify-center flex-auto inline-block" >
        {children}
        </div>
      </body>
    </html>
  )
}
