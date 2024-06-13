import { getAllBooks } from '@/lib/actions/book.actions';
import Banner from '@/components/shared/Banner';
import { Collection } from '@/components/shared/Collection';

type Book = {
  _id: string;
  bookName: string;
  author: string;
  bookDescription: string;
  postedAt: Date;
  imageURLs: string[];
  category: {_id: string, name: string};
  language: {_id: string, name: string};
  isBookFree: boolean;
  price?: string;
  salePrice?: string;
  location: string;
  bookOwner: {_id: string, firstName: string, lastName: string, photo: string};
};

const Home = async () => {
  let books: Book[] = [];
  try {
    books = await getAllBooks();

  } catch (error) {

  }


  // Filter books based on collection types
  const recentlyUploaded = books.filter(book => {
    const postedDate = new Date(book.postedAt);
    const now = new Date();
    const timeDifference = now.getTime() - postedDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference <= 30; // e.g., books uploaded in the last 30 days
  });
  const booksOnSale = books.filter(book => book.salePrice !== undefined && book.salePrice !== "");
  const freeBooks = books.filter(book => book.isBookFree);


  return (
    <>
      <Banner />
      <div className="mb-[80px]">
        <Collection
          collection_type='Recently Uploaded'
          books={recentlyUploaded}
        />
        <Collection
          collection_type='Books on Sale'
          books={booksOnSale}
        />
        <Collection
          collection_type='Free Books'
          books={freeBooks}
        />
      </div>
    </>
  );
}

export default Home;
