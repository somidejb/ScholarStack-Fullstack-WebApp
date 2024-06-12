// app/(root)/page.tsx
import Banner from '@/components/shared/Banner';
import { Collection } from '@/components/shared/Collection';

type Book = {
  id: string;
  title: string;
  imageUrl: string;
  author: string;
  price: string;
  condition: string;
  description: string;
  category: string;
};

async function fetchBooks(): Promise<Book[]> {
  console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error('NEXT_PUBLIC_API_URL is not defined');
    return [];
  }

  try {
    const res = await fetch(`${apiUrl}/api/books`);
    console.log('Fetch response:', res);

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error fetching books:', res.status, errorText);
      return [];
    }

    const books = await res.json();
    console.log('Books fetched:', books);
    return books;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

const Home = async () => {
  const books = await fetchBooks();

  const recentlyUploaded = books.filter(book => book.category === 'Recently Uploaded');
  const booksOnSale = books.filter(book => book.category === 'Books on Sale');
  const freeBooks = books.filter(book => book.category === 'Free Books');

  return (
    <>
      <Banner />
      <div className="mb-[80px]">
        <Collection collection_type='Recently Uploaded' books={recentlyUploaded} />
        <Collection collection_type='Books on Sale' books={booksOnSale} />
        <Collection collection_type='Free Books' books={freeBooks} />
      </div>
    </>
  );
};

export default Home;
