import React from "react";
import BookDetails from "@/components/shared/BookDetails";
import { fetchBookById } from "@/lib/actions/book.actions";
import { Metadata } from "next";

type Book = {
  _id: string;
  title: string;
  author: string;
  description: string;
  imageURLs: string[]; // Assuming the API returns imageURLs
  price: string;
  salePrice?: string;
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

  console.log("Book found:", book); // Log the found book

  const bookDetails = {
    ...book,
    images: book.imageURLs, // Convert imageURLs to images
  };

  return (
    <div className="mt-[100px]">
      <BookDetails book={bookDetails} />
    </div>
  );
};

export default Page;
