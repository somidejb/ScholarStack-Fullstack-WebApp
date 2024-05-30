import { headerLinks } from '@/constants';
import Link from 'next/link';
import React from 'react';

/**
 * This component renders the navigation items for the header.
 * It uses the `headerLinks` array from the `constants` file to generate the navigation items.
 * Each navigation item is a link that is rendered as a list item.
 * The list item is styled with Tailwind CSS classes.
 * The `headerLinks` array contains objects with two properties: `label` and `route`.
 * The `label` property is the text displayed for the navigation item, and the `route` property is the URL the link navigates to.
 * The component uses the `Link` component from Next.js to create the links.
 * The `Link` component is wrapped around the list item to enable client-side navigation.
 * The `key` prop is set to `link.route` to provide a unique identifier for each list item.
 * The `href` prop of the `Link` component is set to `link.route` to specify the URL the link navigates to.
 * The list item has two child elements: the text displaying the navigation item label, and a chevron icon displayed on smaller screens.
 * The text is styled with Tailwind CSS classes to set the font size, color, and font weight.
 * The chevron icon is hidden on larger screens using the `md:hidden` class.
 * The list item is styled with Tailwind CSS classes to set the background color, text color, border radius, and hover effects.
 * The `bg-white` class sets the background color to white.
 * The `transition-colors` class enables smooth color transitions on hover.
 * The `duration-300` class sets the transition duration to 300 milliseconds.
 * The `ease-in-out` class sets the transition timing function to ease-in-out.
 * The `hover:bg-blue-900` class sets the background color to blue on hover.
 * The `hover:bg-rounded-50` class applies a border radius of 50% to the background on hover.
 * The `hover:bg-opacity-80` class sets the background opacity to 80% on hover.
 * The `hover:text-white` class sets the text color to white on hover.
 * The `rounded-md` class applies a border radius of 0.375rem (6px) to the list item.
 * The `hover:p-3` class adds padding of 0.75rem (12px) to the list item on hover.
 */
const NavItems = () => {
  return (
    <ul className="flex flex-col mt-3 md:flex-row gap-4 md:gap-8">
      {headerLinks.map((link) => (
        <Link key={link.route} href={link.route}>
          <li className="flex items-center justify-between cursor-pointer bg-white transition-colors duration-300 ease-in-out hover:bg-blue-900 hover:bg-rounded-50 bg-opacity-80 hover:text-white rounded-md hover:p-3">
            <h2 className="text-lg font-medium text-black md:text-white">
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
