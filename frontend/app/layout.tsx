import './globals.css'
import Navbar from './Components/Navbar/Navbar'
import { Nunito } from 'next/font/google';
import { date_instance } from './Helper/Modules';

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
        <Navbar date={date_instance}/>
        <div className="pt-32" >
        {children}
        </div>
      </body>
    </html>
  )
}
