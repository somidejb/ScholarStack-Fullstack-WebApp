import React from "react";
import Link from "next/link";
import { headerLinks } from "@/constants";
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

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger>
            <Image
              src="/assets/images/hamburger.png"
              alt="Hamburgermenu"
              width={32}
              height={32}
              />
        </SheetTrigger>
        <SheetContent className = "flex flex-col gap-6 bg-white md:hidden">
              <Image
                src="/assets/images/scholarstacklogo.png"
                alt="ScholarStackLogo"
                width={24}
                height={25}
              />
              <h2 className="text-[24px] text-black font-semibold font-['PT_Serif']">
                Scholar Stack
              </h2>
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
    
  );
};

export default MobileNav;
