import { headerLinks } from '@/constants';
import Link from 'next/link';
import React from 'react';

const NavItems = ({ isMobile = false }) => {
  return (
    <ul className={`flex ${isMobile ? 'flex-col gap-4' : 'gap-8'}`}>
      {headerLinks.map((link) => (
        <li key={link.route} className="flex items-center justify-between">
          <Link href={link.route}>
            <h2 className={`text-lg font-medium ${isMobile ? 'text-black' : 'text-white'}`}>
              {link.label}
            </h2>
          </Link>
          {isMobile && <h2 className="text-black ml-2">{'>'}</h2>}
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
