"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NavItems from "./NavItems";
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";
import { usePathname } from "next/navigation"; 

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src="/assets/images/hamburger.png"
            alt="Hamburgermenu"
            width={32}
            height={32}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 md:hidden rounded-l-3xl bg-white">
          <div className="relative flex items-center mt-6 mb-3">
            <Separator className="flex-grow border border-gray-50" />
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white px-2">
              <Image
                src="/assets/images/mobilelogo.png"
                alt="ScholarStackLogo"
                width={24}
                height={25}
              />
              <h2 className="text-[20px] text-black font-semibold font-['PT_Serif']">
                ScholarStack
              </h2>
            </div>
          </div>
          <NavItems pathname={pathname} /> 
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
