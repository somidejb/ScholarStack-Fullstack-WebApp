import BookForm from '@/components/shared/BookForm'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import React from 'react'
 
const UploadBook = async () => {
  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string;
  const currentUser = await getUserById(userId);
  console.log("current User: ", currentUser);
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-900 mt-1"> Upload Book</h2>
      </section>
      <BookForm
        userId = {userId}
        type="Upload"  
        currentUser = {currentUser}
      />
    </>
  )
}
 
export default UploadBook