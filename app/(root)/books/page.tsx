import BookCard from '@/components/shared/BookCard'; // Ensure this path is correct
import Filters from '@/components/shared/Filters';
import SearchBar from '@/components/shared/SearchBar';
import { getAllBooks, getFavorites2 } from '@/lib/actions/book.actions';
import { IBook } from '@/lib/mongodb/database/models/book.model';
import { auth } from '@clerk/nextjs/server';
import Pagination from '@/components/shared/Pagination';
import { SearchParamProps } from '@/types';
import Link from 'next/link';

export default async function Books({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const filters = (searchParams?.Filters as string) || "";

  // Parse the Filters parameter manually
  const parsedFilters: Record<string, string> = filters
    .split('_AND_')
    .reduce((acc, filter) => {
      const [key, value] = filter.split('=');
      if (key && value) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, string>);

  const category = parsedFilters.categories || "";
  const language = parsedFilters.languages || "";
  const price = parsedFilters.price || "";

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  // Fetch books data
  const result = await getAllBooks({
    query: searchText,
    category,
    language,
    price,
    page: searchParams.page ? +searchParams.page : 1,
    limit: 16,
  });

  const books = result?.data ?? [];
  const isNext = result?.isNext ?? false;
  const totalPages = result?.totalPages ?? 1;

  // // Fetch favorites data
  // let favorites: string[] = [];
  // if (userId) {
  //   const favoriteBooks = await getFavorites2(userId, );
  //   favorites = favoriteBooks.map((favorite: IBook) => favorite._id);
  // }

  return (
    <>
      <div className="flex">
        <Filters />
        <div className="w-full flex flex-col items-center justify-center">
          <SearchBar />
          {books.length === 0 ? (
            <div className="text-center mt-10">
              <img src="/assets/icons/no-result.png" alt="No result found" className="mx-auto" />
              <h2 className="font-bold md:text-[30px]">Oops! No result found</h2>
              <p className="font-semibold text-gray-700">We're sorry we don't have what you are looking for</p>
              <Link href="/books/upload" className="mt-4 font-bold inline-block bg-[#31457B] text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200">
                  Upload Book
              </Link>
            </div>
          ) : (
            <>
              <div className="px-[30px] grid gap-x-[35px] md:gap-x-[30px] lg:gap-x-[40px] xl:gap-x-[60px] gap-y-[20px] grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 mb-6 mt-5 md:mt-10">
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
                    //favorites={favorites}
                    bookOwnerId={book.bookOwner._id}
                  />
                ))}
              </div>
              <div className="mt-10 mb-5">
                <Pagination 
                  pageNumber={page}
                  isNext={isNext}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
