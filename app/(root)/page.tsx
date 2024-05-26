import BookCard from '@/components/shared/BookCard'
import { books } from '@/constants'
import Image from 'next/image'
import React from 'react'

const Home = () => {
  return (
    <main className="mx-auto px-4 py-8">
      <BookCard  
        title={books[0].title}
        imageUrl={books[0].image}
        author={books[0].author}
        price={books[0].price}
      />
    </main>
  )
}

export default Home