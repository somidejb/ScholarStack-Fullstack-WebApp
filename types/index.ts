import { IBook } from "@/lib/mongodb/database/models/book.model";
// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type CreateChatParams = {
  userId: string;
  members: string[];
  path?: string;
}

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

export type DeleteUserParams = {
  clerkId: string | undefined;
}

// ====== BOOK PARAMS
export type CreateBookParams = {
  userId: string;
  book: {
    title: string;
    author: string;
    description: string;
    postedAt: Date;
    imageURLs: string[];
    categoryId: string;
    languageId: string;
    isFree?: boolean;
    price?: string;
    salePrice?: string;
    location: string;
  };
  path: string;
  page: string;
  bookId?: string;
};

export type UpdateBookParams = {
  userId: string;
  book: {
    _id: string;
    title: string;
    author: string;
    description: string;
    postedAt: Date;
    imageURLs: string[];
    categoryId: string;
    languageId: string;
    isFree?: boolean;
    price?: string;
    salePrice?: string;
    location: string;
  };
  path: string;
};

export type DeleteBookParams = {
  bookId: string;
  path: string;
  page: string;
};

export type GetAllBooksParams = {
  query: any;
  limit?: number;
  page: number;
  category?: string;
  language?: string;
  price?: string;
};

// ====== ORDER PARAMS
export type CreateOrderParams = {
  userId: string;
  order: {
    seller: string;
    book: string;
    price: number;
    orderDate?: Date;
  };
  path: string;
};

export type UpdateOrderParams = {
  userId: string;
  order: {
    _id: string;
    seller?: string;
    book?: string;
    price?: number;
    orderDate?: Date;
  };
  path: string;
};

export type DeleteOrderParams = {
  orderId: string;
  path: string;
};

export type GetAllOrdersParams = {
  query?: any;
  limit?: number;
  page?: number;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ====== CUSTOM PARAMS
export type GetOrdersByUserParams = {
  userId: string | null;
  limit?: number;
  page: string | number | null;
};
