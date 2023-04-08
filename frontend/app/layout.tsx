import Head from 'next/head'
import './globals.css'

export const metadata = {
  title: 'Paytrack',
  description: 'A Rius2g project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
      <h1>Paytrack</h1>
      </Head>
      <body>
        <h1>Paytrack</h1>
        <div className="justify-center flex flex-auto inline-block" >
        {children}
        </div>
      </body>
    </html>
  )
}
