"use client";

import { ChangeEvent, ReactEventHandler, useEffect, useState } from 'react';
import { getAllCategories } from '@/lib/actions/category.actions';
import { ICategory } from '@/lib/mongodb/database/models/category.model';
import { ILanguage } from '@/lib/mongodb/database/models/language.model';
import { getAllLanguages } from '@/lib/actions/language.actions';
import Image from 'next/image';
import { Checkbox } from '../ui/checkbox';
import { prices } from '@/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { motion } from 'framer-motion';

const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
}

const Filters = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const filterQuery = searchParams?.get('filterQuery');
    const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
    const [checkedLanguages, setCheckedLanguages] = useState<string[]>([]);
    const [checkedPrices, setCheckedPrices] = useState<string[]>([]);

    const handleCheckboxChange = (checked: boolean, name: string, type: 'category' | 'language' | 'price') => {
        if (type === 'category') {
            setCheckedCategories(prev => checked ? [...prev, name] : prev.filter(n => n !== name));
        } else if (type === 'language') {
            setCheckedLanguages(prev => checked ? [...prev, name] : prev.filter(n => n !== name));
        } else if (type === 'price') {
            setCheckedPrices(prev => checked ? [...prev, name] : prev.filter(n => n !== name));
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const filterValues = [];

            if (checkedCategories.length > 0) {
                filterValues.push(`categories=${checkedCategories.join('_with_')}`);
            }
            if (checkedLanguages.length > 0) {
                filterValues.push(`languages=${checkedLanguages.join('_with_')}`);
            }
            if (checkedPrices.length > 0) {
                filterValues.push(`price=${checkedPrices.join('_with_')}`);
            }

            const filters = filterValues.join('_AND_');

            if (filters) {
                const newUrl = formUrlQuery({
                    params: searchParams?.toString(),
                    key: 'Filters',
                    value: filters
                });
                router.push(newUrl, { scroll: false });
            } else {
                if (pathname === '/books') {
                    const newUrl = removeKeysFromQuery({
                        params: searchParams?.toString(),
                        keysToRemove: ['Filters']
                    });
                    router.push(newUrl, { scroll: false });
                }
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [checkedCategories, checkedLanguages, checkedPrices, pathname, router, searchParams]);

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [showMoreCategories, setShowMoreCategories] = useState<number>(5);
    const [languages, setLanguages] = useState<ILanguage[]>([]);

    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getAllCategories();

            if (categoryList) {
                const titleCasedCategories = categoryList.map((category: ICategory) => ({
                    ...category,
                    name: toTitleCase(category.name),
                }));
                setCategories(titleCasedCategories);
            }
        };

        getCategories();
    }, []);

    useEffect(() => {
        const getLanguages = async () => {
            const languageList = await getAllLanguages();

            if (languageList) {
                const titleCasedLanguages = languageList.map((language: ILanguage) => ({
                    ...language,
                    name: toTitleCase(language.name),
                }));
                setLanguages(titleCasedLanguages);
            }
        };

        getLanguages();
    }, []);

    const handleShowMore = () => {
        setShowMoreCategories((prev) => {
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
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col rounded-[15px] w-[140px] md:w-[190px] text-nowrap xl:w-[211px] overflow-x-auto border py-[20px] card-shadow" 
            style={{ height: 'fit-content' }}
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
                <p className="text-[#31457b] font-bold md:text-lg xl:text-xl md:tracking-widest">FILTERS</p>
            </div>
            <div className="pl-2 md:pl-5">
                <h3 className="font-semibold md:text-lg xl:text-xl">Categories</h3>
                <ul>
                    {categories.slice(0, showMoreCategories).map((category) => (
                        <motion.li 
                            key={category._id} 
                            className="mt-1 md:mt-0"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * categories.indexOf(category) }}
                        >
                            <div className="flex items-center">
                                <Checkbox 
                                    id={category.name} 
                                    checked={checkedCategories.includes(category.name)}
                                    onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, category.name, 'category')}    
                                />
                                <label htmlFor={category.name} className="ml-2 md:text-base text-xs">{category.name}</label>
                            </div>
                        </motion.li>
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
                    {languages.map((language) => (
                        <motion.li 
                            key={language._id} 
                            className="mt-1 md:mt-0"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * languages.indexOf(language) }}
                        >
                            <div className="flex items-center">
                                <Checkbox 
                                    id={language.name} 
                                    checked={checkedLanguages.includes(language.name)}
                                    onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, language.name, 'language')}     
                                />
                                <label htmlFor={language.name} className="ml-2 md:text-base text-xs">{language.name}</label>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </div>
            <div className="pl-2 md:pl-5">
                <h3 className="font-semibold md:text-lg xl:text-xl">Price</h3>
                <ul>
                    {prices.map((price) => (
                        <motion.li 
                            key={price.label} 
                            className="mt-1 md:mt-0"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * prices.indexOf(price) }}
                        >
                            <div className="flex items-center">
                                <Checkbox 
                                    id={price.label} 
                                    checked={checkedPrices.includes(price.label)}
                                    onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, price.label, 'price')} 
                                />
                                <label htmlFor={price.label} className="ml-2 md:text-base text-xs">{price.label}</label>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};

export default Filters;
