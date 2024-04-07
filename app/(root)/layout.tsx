import React from 'react'

const RootLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <main>{children}</main>
  )
}

export default RootLayout