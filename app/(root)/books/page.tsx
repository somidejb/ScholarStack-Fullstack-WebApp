import { fetchAllBooks } from "@/lib/actions/book.actions";
import { getAllCategories } from "@/lib/actions/category.actions";
import { getAllLanguages } from "@/lib/actions/language.actions";
import BooksClient from "@/components/shared/BooksClient";

const capitalizeFirstLetter = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

const toTitleCase = (str: string) =>
  str.replace(/\w\S*/g, capitalizeFirstLetter);

const generatePriceRanges = (books: any[]) => {
  const ranges = new Set<string>();

  books.forEach((book: { salePrice: any; price: any; }) => {
    const price = parseFloat(book.salePrice || book.price || "0");

    if (price < 10) {
      ranges.add("Under $10");
    } else if (price >= 10 && price < 50) {
      ranges.add("$10 - $50");
    } else if ( price >= 50 && price < 100) {
      ranges.add("$50 - $100");
    } else {
      ranges.add("Over $100");
    }
  });

  return Array.from(ranges).map((range) => ({
    label: range,
    value: range.replace(/\s+/g, "_").toLowerCase(),
  }));
};

const BooksPage = async () => {
  let categories = [];
  let languages = [];
  let books = [];
  let prices: { label: string; value: string; }[] = [];
  let error = null;

  try {
    const [categoryList, languageList, bookList] = await Promise.all([
      getAllCategories(),
      getAllLanguages(),
      fetchAllBooks(),
    ]);

    categories = categoryList.map((category: { name: string; }) => ({
      ...category,
      name: toTitleCase(category.name),
    }));

    languages = languageList.map((language: { name: string; }) => ({
      ...language,
      name: toTitleCase(language.name),
    }));

    books = bookList;
    prices = generatePriceRanges(bookList);
  } catch (err) {
    error = "Failed to fetch data";
  }

  return (
    <BooksClient
      categories={categories}
      languages={languages}
      books={books}
      prices={prices}
      error={error}
    />
  );
};

export default BooksPage;
