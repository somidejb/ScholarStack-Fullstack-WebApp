"use client";
import { headerLinks } from '@/constants';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

const NavItems = ({ pathname }: { pathname: string }) => {
  const { user } = useUser();
  const [profileLink, setProfileLink] = useState('/profile');

  useEffect(() => {
    if (user) {
      setProfileLink(`/profile/${user.id}`);
    }
  }, [user]);

  return (
    <ul className="flex flex-col md:flex-row gap-8 tracking-widest md:gap-8 lg:gap-12">
      {headerLinks.map((link) => (
        <Link key={link.route} href={link.label === 'Profile' ? profileLink : link.route}>
          <li className={`flex items-center justify-between cursor-pointer ${pathname === link.route ? 'bg-blue-800 p-2 rounded-lg text-white' : 'text-black'}`}>
            <h2 className="text-lg font-medium md:text-white">
              {link.label}
            </h2>
            <h2 className="text-black ml-2 md:hidden">{'>'}</h2>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default NavItems;
