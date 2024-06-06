// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
  }
  
  export type UpdateUserParams = {
    firstName: string
    lastName: string
    username: string
    photo: string
  }
  
  // ====== EVENT PARAMS
  export type CreateBookParams = {
    userId: string
    book: {
      title: string;
      author: string;
      description: string;
      postedAt: Date;
      imageURLs: string[];
      categoryId: string;
      languageId: string;
      isFree?: boolean;
      price: string;
      salePrice?: string;
      location: string;
    }
    path: string
  }
  
  export type UpdateBookParams = {
    userId: string
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
      price: string;
      salePrice?: string;
      location: string;
    }
    path: string
  }
  export type DeleteBookParams = {
    bookId: string
    path: string
  }

  export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
  }
  
  // ====== URL QUERY PARAMS
  export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }
  
  export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }