import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from "query-string"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export const handleError = (error: unknown) => {
  console.error(error);
  
  if (error instanceof Error) {
    throw new Error(error.message);
  } else if (typeof error === 'string') {
    throw new Error(error);
  } else {
    throw new Error(JSON.stringify(error));
  }
};

interface UrlQueryParams {
  params: string
  key: string
  value: string | null
}

export const formUrlQuery = ({params, key, value}: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl
  },
  {skipNull: true});
}

interface RemoveUrlQueryParams {
  params: string
  keysToRemove: string[]
}
export const removeKeysFromQuery = ({params, keysToRemove}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach(key => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl
  },
  {skipNull: true});
}