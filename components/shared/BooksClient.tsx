"use client";

import React, { useState } from "react";
import Image from "next/image";
import BookCard from "@/components/shared/BookCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface Book {
  _id: string;
  bookName: string;
  author: string;
  price?: string;
  salePrice?: string;
  imageURLs: string[];
}

interface ICategory {
  _id: string;
  name: string;
}

interface ILanguage {
  _id: string;
  name: string;
}

interface BooksClientProps {
  categories: ICategory[];
  languages: ILanguage[];
  books: Book[];
  prices: { label: string; value: string }[];
  error: string | null;
}

const BooksClient: React.FC<BooksClientProps> = ({
  categories,
  languages,
  books,
  prices,
  error,
}) => {
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);

  const handleShowMore = () => {
    setShowMoreCategories(true);
  };

  const handleShowLess = () => {
    setShowMoreCategories(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const filtered = books.filter(
        (book) =>
          (book.bookName &&
            book.bookName.toLowerCase().includes(query.toLowerCase())) ||
          (book.author &&
            book.author.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  };

  const categoriesToShow = showMoreCategories
    ? categories
    : categories.slice(0, 5);

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex">
        <div
          className="flex flex-col rounded-[15px] w-[93px] md:w-[190px] text-nowrap xl:w-[211px] overflow-x-auto border py-[20px] card-shadow"
          style={{ height: "fit-content" }}
        >
          <div className="flex-center gap-1 mb-4">
            <div className="w-[15px] md:w-[30px]">
              <Image
                src="/assets/icons/filters.png"
                alt="Filter Icon"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
            <p className="text-[#31457b] font-bold md:text-lg xl:text-xl md:tracking-widest">
              FILTERS
            </p>
          </div>
          <div className="pl-2 md:pl-5">
            <h3 className="font-semibold md:text-lg xl:text-xl">Categories</h3>
            <ul>
              {categoriesToShow.map((category) => (
                <li key={category._id} className="mt-1 md:mt-0">
                  <div className="flex items-center">
                    <Checkbox id={category.name} />
                    <label
                      htmlFor={category.name}
                      className="ml-2 md:text-base text-xs"
                    >
                      {category.name}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
            {categories.length > 5 && !showMoreCategories && (
              <p
                onClick={handleShowMore}
                className="text-blue-600 cursor-pointer"
              >
                See more...
              </p>
            )}
            {showMoreCategories && (
              <p
                onClick={handleShowLess}
                className="text-blue-600 cursor-pointer"
              >
                Show less
              </p>
            )}
          </div>
          <div className="pl-2 md:pl-5">
            <h3 className="font-semibold md:text-lg xl:text-xl">Languages</h3>
            <ul>
              {languages.map((language) => (
                <li key={language._id} className="mt-1 md:mt-0">
                  <div className="flex items-center">
                    <Checkbox id={language.name} />
                    <label
                      htmlFor={language.name}
                      className="ml-2 md:text-base text-xs"
                    >
                      {language.name}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="pl-2 md:pl-5">
            <h3 className="font-semibold md:text-lg xl:text-xl">Price</h3>
            <ul>
              {prices.map((price) => (
                <li key={price.value} className="mt-1 md:mt-0">
                  <div className="flex items-center">
                    <Checkbox id={price.value} />
                    <label
                      htmlFor={price.value}
                      className="ml-2 md:text-base text-xs"
                    >
                      {price.label}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="mt-[25px] flex bg-[#F6F4F4] px-[5px] md:px-[15px] min-h-[54px] rounded-[20px] justify-between relative w-[250px] md:w-[530px] lg:w-[700px] xl:w-[900px] drop-shadow-lg">
            <Input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search here..."
              className="h-full bg-[#F6F4F4] rounded-[20px] border-none focus-visible:ring-offset-0 focus-visible:ring-transparent focus:ring-transparent"
            />
            {/* <Image
              src="/assets/icons/search.png"
              alt="Search Icon"
              width={20}
              height={20}
              className="object-contain"
            /> */}
          </div>
          {filteredBooks.length > 0 ? (
            <div className="px-[30px] grid gap-x-[35px] md:gap-x-[20px] xl:gap-x-[35px] gap-y-[20px] grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 mb-6 mt-5 md:mt-10">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book._id}
                  title={book.bookName}
                  imageUrl={book.imageURLs[1]}
                  author={book.author}
                  price={
                    book.price
                      ? book.price
                      : book.salePrice
                      ? book.salePrice
                      : "Free"
                  }
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mt-10">
              <p className="text-[#31457b] font-bold md:text-lg xl:text-xl md:tracking-widest mt-4">
                No books found
              </p>
              <p className="text-gray-500 md:text-base text-sm">
                Try searching with different keywords.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BooksClient;
