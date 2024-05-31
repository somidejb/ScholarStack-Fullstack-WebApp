import React from 'react';
import Link from 'next/link';
import { headerLinks } from '@/constants';

const MobileNav = () => {
  return (
    <nav className="flex flex-col gap-4">
      <ul className="flex flex-col gap-4">
        {headerLinks.map((link) => (
          <li key={link.route} className="flex items-center justify-between">
            <Link href={link.route} className="text-lg font-medium text-black">
              {link.label}
            </Link>
            <h2 className="text-black ml-2">{'>'}</h2>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNav;
