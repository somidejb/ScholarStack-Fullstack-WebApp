import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import React from 'react'

const RootLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <div className = "flex h-screen flex-col">
      <Header />
        <main className = "flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default RootLayout