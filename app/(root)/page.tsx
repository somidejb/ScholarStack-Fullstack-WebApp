import Banner from '@/components/shared/Banner'
import BookCard from '@/components/shared/BookCard'
import { Collection } from '@/components/shared/Collection'
import { getAllBooks } from '@/lib/actions/book.actions'
import { auth } from '@clerk/nextjs/server';


export default async function Home(){
  const books = await getAllBooks({
    query : "",
    limit: 10,
    page: 1,
    category: "",
    language: "",
  });
  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <>
      <Banner />
      <div className="mb-[80px]">
        <Collection 
          data={books?.data}
          collection_type='Recently Uploaded'
          emptyTitle='No books uploaded yet'
          emptyStateSubtext='Check back later for new books'
          limit={6}
          userId={userId}
        />
        <Collection 
          data={books?.data}
          collection_type='Recently Uploaded'
          emptyTitle='No books uploaded yet'
          emptyStateSubtext='Check back later for new books'
          limit={6}
          userId={userId}
        />
        <Collection 
          data={books?.data}
          collection_type='Recently Uploaded'
          emptyTitle='No books uploaded yet'
          emptyStateSubtext='Check back later for new books'
          limit={6}
          userId={userId}
        />
      </div>
    </>
  )
}
