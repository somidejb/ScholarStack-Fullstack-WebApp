import BookCard from '@/components/shared/BookCard'
import { books } from '@/constants'
import Image from 'next/image'
import React from 'react'

const Home = () => {
  return (
    <div>
      <main className="container mx-auto px-4 py-8">
        <BookCard />
      </main>
    </div>
  )
}

export default Home