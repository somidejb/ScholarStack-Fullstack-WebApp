"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';


const SearchBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const query = searchParams?.get('query');

    const [search, setSearch] = useState(query || '');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                const newUrl = formUrlQuery({
                    params: searchParams?.toString(),
                    key: 'query',
                    value: search
                });
                router.push(newUrl, { scroll: false });
            } else {
                if (pathname === '/books') {
                    const newUrl = removeKeysFromQuery({
                        params: searchParams?.toString(),
                        keysToRemove: ['query']
                    });
                    router.push(newUrl, { scroll: false });
                }
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search, pathname, router, searchParams, query]);

    return (
        <div className="relative mt-[25px] flex bg-[#F6F4F4] px-[5px] md:px-[15px] min-h-[54px] rounded-[20px] justify-between w-[250px] md:w-[530px] lg:w-[700px] xl:w-[900px] drop-shadow-lg">
            <Input
                type="text"
                value={search}
                placeholder="Search here..."
                onChange={(e) => setSearch(e.target.value)}
                className="h-full bg-[#F6F4F4] rounded-[20px] border-none focus-visible:ring-offset-0 focus-visible:ring-transparent focus:ring-transparent"
            />

        </div>
    );
};

export default SearchBar;
