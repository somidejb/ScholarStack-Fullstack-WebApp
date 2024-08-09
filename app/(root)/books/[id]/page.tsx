import React from "react";
import BookDetails from "@/components/shared/BookDetails";
import { fetchBookById, getFavorites2 } from "@/lib/actions/book.actions";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { IBook } from "@/lib/mongodb/database/models/book.model";
import { getLanguageById } from "@/lib/actions/language.actions";

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
  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string;
  const book = await fetchBookById(params.id);
  const languageObject = await getLanguageById(book.language.toString());
  
  let favorites: string[] = [];
  if (userId) {
    const favoriteBooks = await getFavorites2(userId);
    favorites = favoriteBooks.map((favorite: IBook) => favorite._id);
  }

  if (!book) {
    return (
      <div className="mt-[100px]">
        <p>No book found</p>
      </div>
    );
  }
 
 
  const bookDetails = {
    ...book,
    images: book.imageURLs,
  };
 
  return (
    <BookDetails book={bookDetails} userId={userId} bookOwner={book.bookOwner} favorites={favorites} language={languageObject.name} />
  );
};
 
export default Page;