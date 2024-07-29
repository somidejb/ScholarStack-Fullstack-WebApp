import { headerLinks } from '@/constants';
import Link from 'next/link';
import React from 'react';

const NavItems = ({ pathname }: { pathname: string }) => {
  return (
    <ul className="flex flex-col md:flex-row gap-8 tracking-widest md:gap-8 lg:gap-12">
      {headerLinks.map((link) => (
        <Link key={link.label} href={link.route}>
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
