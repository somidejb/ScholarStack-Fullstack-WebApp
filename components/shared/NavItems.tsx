import { headerLinks } from '@/constants';
import Link from 'next/link';
import React from 'react';

// This component renders the navigation items for the header.
// The navigation items are defined in the 'headerLinks' constant.
const NavItems = () => {
  // The JSX code below is rendered for each navigation item.
  // The 'headerLinks' array is mapped to create a list of navigation items.
  // Each item is wrapped in a <li> element with a unique key.
  // The label of the navigation item is rendered within an <h2> element.
  // The link is wrapped in a <Link> component from Next.js which allows for client-side routing.
  // If the navigation is for mobile, an arrow icon is also rendered.
  return (
    <ul className="flex flex-col md:flex-row gap-4 md:gap-8">
      {headerLinks.map((link) => (
        <li key={link.route} className="flex items-center justify-between">
          <Link href={link.route}>
            <h2 className="text-lg font-medium text-black md:text-white">
              {link.label}
            </h2>
          </Link>
          <h2 className="text-black ml-2 md:hidden">{'>'}</h2>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
