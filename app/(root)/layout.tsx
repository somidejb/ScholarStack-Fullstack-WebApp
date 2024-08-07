import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import { auth } from '@clerk/nextjs/server';

import React from 'react'

const RootLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <div className = "flex w-full flex-col">
      <Header userId={userId}/>
        <main className = "flex-1 w-full">{children}</main>
      <Footer />
      
    </div>
  )
}

export default RootLayout