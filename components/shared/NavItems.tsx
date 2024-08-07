"use client";
import { headerLinks } from '@/constants';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

type NavItemsProp = {
  pathname: string
  userId: string;
};


const NavItems = ({ pathname, userId }: NavItemsProp) => {
  const { user } = useUser();
  console.log("user: ", userId);
  const [profileLink, setProfileLink] = useState('/profile');

  // Define allowed admin user IDs
  const adminUserIds = ["6663b2507fa1ddb6c6dc79f4", "6663a8c698ce69a0a8dad27c"];

  useEffect(() => {
    if (user) {
      setProfileLink(`/profile/${user.id}`);
    }
  }, [user]);

  return (
    <ul className="flex flex-col md:flex-row gap-8 tracking-widest md:gap-8 lg:gap-12">
      {headerLinks.map((link) => {
        // Check if the user ID is allowed to see the Admin link
        if (link.label === "Admin" && !adminUserIds.includes(userId)) {
          return null; // Return null to skip rendering this link
        }
        
        return (
          <Link key={link.route} href={link.label === 'Profile' ? profileLink : link.route}>
            <li
              className={`flex items-center justify-between cursor-pointer ${
                pathname === link.route ? 'max-md:bg-blue-800 max-md:p-2 rounded-lg text-white' : 'text-black'
              }`}
            >
              <h2 className="text-lg font-medium md:text-white">
                {link.label}
              </h2>
              <h2 className="text-black ml-2 md:hidden">{'>'}</h2>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default NavItems;
