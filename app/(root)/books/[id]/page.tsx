// pages/book/[id].tsx
import React from "react";
import BookDetails from "@/components/shared/BookDetails";
import { fetchBookById, fetchBooksByCategory } from "@/lib/actions/book.actions";
import { Metadata } from "next";

type Book = {
  _id: string;
  title: string;
  author: string;
  description: string;
  imageURLs: string[];
  price: string;
  salePrice?: string;
  category: string;
};

type BookPageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const book = await fetchBookById(params.id);

  if (!book) {
    return {
      title: "Book Not Found",
    };
  }

  return {
    title: book.title,
  };
}

const Page = async ({ params }: BookPageProps) => {
  const book = await fetchBookById(params.id);

  if (!book) {
    console.log("No book found with id:", params.id);
    return (
      <div className="mt-[100px]">
        <p>No book found</p>
      </div>
    );
  }

  console.log("Book found:", book);

  let booksInSameCategory = await fetchBooksByCategory(book.category);

  // Filter out the current book from the list of similar books
  booksInSameCategory = booksInSameCategory.filter((otherBook: Book) => otherBook._id !== book._id);

  console.log("Books in the same category (excluding current book):", booksInSameCategory);

  const bookDetails = {
    ...book,
    images: book.imageURLs,
  };

  return (
    <div className="mt-[100px]">
      <BookDetails book={bookDetails} similarBooks={booksInSameCategory} />
    </div>
  );
};

export default Page;
