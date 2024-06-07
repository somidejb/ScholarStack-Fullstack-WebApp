"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import BookCard from '@/components/shared/BookCard';  // Ensure this path is correct
import { books, prices } from '@/constants';  // Assuming you have a books array in constants
import { ICategory } from '@/lib/mongodb/database/models/category.model';
import { getAllCategories } from '@/lib/actions/category.actions';
import { Checkbox } from '@/components/ui/checkbox';
import { getAllLanguages } from '@/lib/actions/language.actions';
import { ILanguage } from '@/lib/mongodb/database/models/language.model';
import { Input } from '@/components/ui/input';


// Function to convert a string to title case
const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
}

const Books = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [showMoreCategories, setShowMoreCategories] = useState<number>(5);
  const [showMoreLanguages, setShowMoreLanguages] = useState(false);
  const [showMorePrices, setShowMorePrices] = useState(false);

  useEffect(() => {
      const getCategories = async () => {
          const categoryList = await getAllCategories();

          if (categoryList) {
              // Convert category names to title case
              const titleCasedCategories = categoryList.map((category: ICategory) => ({
                  ...category,
                  name: toTitleCase(category.name)
              }));
              setCategories(titleCasedCategories);
          }
      }

      getCategories();
  }, [])
  const [languages, setLanguages] = useState<ILanguage[]>([])

    useEffect(() => {
        const getLanguages = async () => {
            const languageList = await getAllLanguages();

            if (languageList) {
                // Convert language names to title case
                const titleCasedLanguages = languageList.map((language: ILanguage) => ({
                    ...language,
                    name: toTitleCase(language.name)
                }));
                setLanguages(titleCasedLanguages);
            }
        }

        getLanguages();
    }, [])

  const handleShowMore = () => {
    setShowMoreCategories(prev => {
      if (prev + 10 >= categories.length) {
        return categories.length;
      }
      return prev + 10;
    });
  };

  const handleShowLess = () => {
    setShowMoreCategories(5);
  };

  return (
    <>
      <div className="flex">
        <div className="flex flex-col rounded-[15px] w-[93px] md:w-[190px] text-nowrap xl:w-[211px] overflow-x-auto border py-[20px] card-shadow" style={{ height: 'fit-content' }}>
          <div className="flex-center gap-1 mb-4">
            <div className = "w-[15px] md:w-[30px]">
              <Image 
                src="/assets/icons/filters.png"
                alt="Filter Icon"
                width={50}
                height={50}
                className = "object-contain"
              />
            </div>
            <p className="text-[#31457b] font-bold md:text-lg xl:text-xl md:tracking-widest">FILTERS</p>
          </div>
          <div className="pl-2 md:pl-5">
            <h3 className="font-semibold md:text-lg xl:text-xl">Categories</h3>
            <ul>
              {categories.slice(0, showMoreCategories).map(category => (
                <li key={category._id} className="mt-1 md:mt-0">
                  <div className="flex items-center">
                    <Checkbox id={category.name}/>
                    <label className="ml-2 md:text-base text-xs">{category.name}</label>
                  </div>
                </li>
              ))}
            </ul>
              {showMoreCategories < categories.length ? (
                <p onClick={handleShowMore} className="text-blue-600 cursor-pointer">
                  See more...
                </p>
              ) : (
                <p onClick={handleShowLess} className="text-blue-600 cursor-pointer">
                  Show less
                </p>
              )}
          </div>
          <div className="pl-2 md:pl-5">
            <h3 className="font-semibold md:text-lg xl:text-xl">Languages</h3>
            <ul>
              {languages.map(language => (
                <li key={language._id} className="mt-1 md:mt-0">
                  <div className="flex items-center">
                    <Checkbox id={language.name}/>
                    <label className="ml-2 md:text-base text-xs">{language.name}</label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="pl-2 md:pl-5">
            <h3 className="font-semibold md:text-lg xl:text-xl">Price</h3>
            <ul>
              {prices.map(price => (
                <li key={price.label} className="mt-1 md:mt-0">
                  <div className="flex items-center">
                    <Checkbox id={price.label}/>
                    <label className="ml-2 md:text-base text-xs">{price.label}</label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="mt-[25px] flex bg-[#F6F4F4] px-[5px] md:px-[15px] min-h-[54px] rounded-[20px] justify-between  relative w-[250px] md:w-[530px] lg:w-[700px] xl:w-[900px] drop-shadow-lg">
            <Input type="text" placeholder="Search here..." className="h-full bg-[#F6F4F4] rounded-[20px] border-none focus-visible:ring-offset-0 focus-visible:ring-transparent focus:ring-transparent" />
            <Image 
              src="/assets/icons/search.png"
              alt="Search Icon"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <div className="px-[30px] grid gap-x-[35px] md:gap-x-[20px] xl:gap-x-[35px] gap-y-[20px] grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 mb-6 mt-5 md:mt-10">
            {books.map(book => (
              <BookCard 
                key={book.id}
                title={book.title}
                imageUrl={book.image}
                author={book.author}
                price={book.price}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Books