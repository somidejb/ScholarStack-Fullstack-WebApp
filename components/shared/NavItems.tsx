import { headerLinks } from '@/constants';
import Link from 'next/link';
import React from 'react';

// This component renders the navigation items for the header.
// It takes an optional prop 'isMobile' which determines whether the navigation
// is being rendered for mobile or desktop.
// The navigation items are defined in the 'headerLinks' constant.
const NavItems = ({ isMobile = false }) => {
  // The JSX code below is rendered for each navigation item.
  // The 'headerLinks' array is mapped to create a list of navigation items.
  // Each item is wrapped in a <li> element with a unique key.
  // The label of the navigation item is rendered within an <h2> element.
  // The link is wrapped in a <Link> component from Next.js which allows for client-side routing.
  // The class names for the <h2> element are conditionally set based on whether the navigation
  // is for mobile or desktop.
  // If the navigation is for mobile, an arrow icon is also rendered.
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
