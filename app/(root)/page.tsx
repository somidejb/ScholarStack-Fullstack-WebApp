import { books } from '@/constants'
import Image from 'next/image'
import React from 'react'

const Home = () => {
  return (
    <div>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to our Book Buying & Selling Platform</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map(book => (
            <div key={book.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-center">
                <Image src={book.image} alt={book.title} width={200} height={300} />
              </div>
              <h2 className="text-xl font-semibold mt-2">{book.title}</h2>
              <p className="text-gray-600">by {book.author}</p>
              <p className="mt-2">${book.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-2">{book.condition}</p>
              <p className="text-sm text-gray-700 mt-2">{book.description}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Buy Now</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Page;
