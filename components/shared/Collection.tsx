// components/shared/Collection.tsx
type Book = {
  id: string;
  title: string;
  author: string;
  price: string;
  imageUrl: string; // Ensure this matches the field name in your API response
  condition: string;
  description: string;
  category: string;
};

type CollectionProps = {
  collection_type: string;
  books: Book[];
};

export const Collection = ({ collection_type, books }: CollectionProps) => {
  return (
    <div>
      <h2>{collection_type}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id}>
            <img src={book.imageUrl} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.price}</p>
            <p>{book.condition}</p>
            <p>{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
