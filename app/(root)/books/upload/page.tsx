import BookForm from '@/components/shared/BookForm'
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const UploadBook = () => {
  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-900 mt-1"> Upload Book</h2>
      </section>
      <BookForm 
        userId = {userId}
        type="Upload"  
      />
    </>
  )
}

export default UploadBook