import BookForm from '@/components/shared/BookForm'
import { getBookById } from '@/lib/actions/book.actions';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

type UpdateBookProps = {
  params: {
    id: string
  }
}

const EditBook = async ({params: {id}}: UpdateBookProps) => {
  const book = await getBookById(id);
  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-900 mt-1"> Upload Book</h2>
      </section>
      <BookForm 
        userId = {userId}
        type="Edit"  
      />
    </>
  )
}

export default EditBook