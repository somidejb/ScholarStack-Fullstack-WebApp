"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavItems from "./NavItems";
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";

// This component renders the mobile navigation menu.
// It is displayed only on small screens (less than 768px)
// and is hidden on larger screens.
const MobileNav = () => {
  return (
    // The nav tag is responsible for rendering the mobile navigation menu.
    <nav className="md:hidden">
      {/* The Sheet component is used to create a mobile-friendly dropdown menu. */}
      <Sheet>
        {/* The SheetTrigger component triggers the display of the SheetContent component. */}
        <SheetTrigger className="align-middle">
          {/* The Image component displays the hamburger menu icon. */}
          <Image
            src="/assets/images/hamburger.png"
            alt="Hamburgermenu"
            width={32}
            height={32}
            className="cursor-pointer"
          />
        </SheetTrigger>
        {/* The SheetContent component contains the content of the mobile navigation menu. */}
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          {/* The relative positioning is used to center the logo vertically. */}
          <div className="relative flex items-center mt-6">
            {/* The Separator component is used to create a horizontal line. */}
            <Separator className="flex-grow border border-gray-50" />
            {/* The absolute positioning is used to center the logo horizontally. */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white px-2">
              {/* The Image component displays the Scholar Stack logo. */}
              <Image
                src="/assets/images/mobilelogo.png"
                alt="ScholarStackLogo"
                width={24}
                height={25}
              />
              {/* The h2 element displays the text "Scholar Stack". */}
              <h2 className="text-20 text-black font-semibold font-['PT_Serif']">
                Scholar Stack
              </h2>
            </div>
          </div>
          {/* The NavItems component renders the navigation items. */}
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
