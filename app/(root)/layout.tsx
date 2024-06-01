import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'

import React from 'react'

const RootLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <div className = "flex w-full  flex-col">
      <Header />
        <main className = "flex-1 w-full">{children}</main>
      <Footer />
      
    </div>
  )
}

export default RootLayout