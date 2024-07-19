"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsMenuButton } from "react-icons/bs";
import { RxFileText } from "react-icons/rx";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"


const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white h-screen shadow-md">
      <div className="p-9">
        <h2 className="text-2xl font-semibold text-blue-900 mb-5">Administration</h2>
        <nav>
          <ul>
            <li className={`mb-5 ${pathname === '/admin/dashboard' ? 'font-bold' : ''}`}>
              <Link href="/admin/dashboard">
                <div className="flex items-center gap-1 hover:text-blue-900">
                  <BsMenuButton className='pl-1 h-[23px] w-[23px]' />
                  Dashboard
                </div>
              </Link>
            </li>
            <li className={`${pathname === '/admin/reports' ? 'font-bold' : ''}`}>
              <Link href="/admin/reports">
                <div className="flex items-center gap-1 hover:text-blue-900">
                  <RxFileText className='pl-1 h-[25px] w-[25px]' />
                  Reports
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>




  );
};

export default Sidebar;
