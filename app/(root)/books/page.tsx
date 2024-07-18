import BookCard from '@/components/shared/BookCard'; // Ensure this path is correct
import Filters from '@/components/shared/Filters';
import SearchBar from '@/components/shared/SearchBar';
import { SearchParamProps } from '@/types';
import { getAllBooks, getFavorites } from '@/lib/actions/book.actions';
import { IBook } from '@/lib/mongodb/database/models/book.model';
import { auth } from '@clerk/nextjs/server';

export default async function Books({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";
  const language = (searchParams?.language as string) || "";
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  // Fetch books data
  const result = await getAllBooks({
    query: searchText,
    category,
    language,
    page,
    limit: 15
  });

  const books = result?.data ?? [];

  // Fetch favorites data
  let favorites: string[] = [];
  if (userId) {
    const favoriteBooks = await getFavorites(userId);
    favorites = favoriteBooks.map((favorite: IBook) => favorite._id);
  }

  return (
    <>
      <div className="flex">
        <Filters />
        <div className="w-full flex flex-col items-center justify-center">
          <SearchBar />
          <div className="px-[30px] grid gap-x-[35px] md:gap-x-[20px] xl:gap-x-[35px] gap-y-[20px] grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 mb-6 mt-5 md:mt-10">
            {books.map((book: IBook) => (
              <BookCard 
                key={book._id}
                userId={userId}
                bookId={book._id}
                title={book.title}
                imageUrl={book.imageURLs[1]}
                author={book.author}
                price={book.price}
                salePrice={book.salePrice}
                favorites={favorites}
                bookOwnerId={book.bookOwner._id} // Pass bookOwnerId to BookCard
            
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}