import { fetchAllBooks, getFavorites } from '@/lib/actions/book.actions';
import Banner from '@/components/shared/Banner';
import { Collection } from '@/components/shared/Collection';
import { auth } from '@clerk/nextjs/server';
import { IBook } from '@/lib/mongodb/database/models/book.model';

const Home = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  let books: IBook[] = [];
  try {
    books = await fetchAllBooks();
  } catch (error) {
    console.error(error);
  }

  // Helper function to sort books by posted date in descending order
  const sortByDateDesc = (a: IBook, b: IBook) => {
    return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
  };

  // Filter and sort books based on collection types
  const recentlyUploaded = books
    .filter(book => {
      const postedDate = new Date(book.postedAt);
      const now = new Date();
      const timeDifference = now.getTime() - postedDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      return daysDifference <= 30; // e.g., books uploaded in the last 30 days
    })
    .sort(sortByDateDesc);

  const booksOnSale = books
    .filter(book => book.salePrice !== undefined && book.salePrice !== "")
    .sort(sortByDateDesc);

  const freeBooks = books
    .filter(book => book.isBookFree)
    .sort(sortByDateDesc);

  return (
    <>
      <Banner />
      <div className="mb-[80px]">
        <Collection
          collection_type='Recently Uploaded'
          books={recentlyUploaded}
          userId={userId}
        />
        <Collection
          collection_type='Books on Sale'
          books={booksOnSale}
          userId={userId}
        />
        <Collection
          collection_type='Free Books'
          books={freeBooks}
          userId={userId}
        />
      </div>
    </>
  );
}

export default Home;
