import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full border-b h-[87px] bg-[#081f5c]">
      <div className="flex items-center h-[35px] justify-between pl-[36px] pt-[37px] w-full">
        {/* Logo and Main Title */}
        <div className="flex items-center ">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/images/logo.png"
              alt="ScholarStackLogo"
              width={37.38}
              height={35}
            />
            <h2 className="text-[24px] text-white font-semibold">
              Scholar Stack
            </h2>
          </Link>
        </div>

        
      <NavItems/>

        {/* Authentication Buttons */}

        <SignedOut>
          <div className="flex items-center mt-1 gap-3">
            <Link href="/sign-in">
            <Button
                asChild
                className="rounded-[15px] w-[113px] h-[55px] bg-white"
              >
                <h2 className="text-black">Login</h2>
              </Button>
            </Link>
            <Link href="/sign-up">
            <Button
                asChild
                className="rounded-[15px] w-[113px] h-[55px] bg-[#007bff]"
              >
                <h2 className="text-white">Sign Up</h2>
              </Button>
            </Link>
            
            <div className="flex items-center ml-3 mr-4">
            <Image
              src="/assets/images/profile-icon.png" 
              alt="Profile Icon"
              width={37.8} 
              height={35} 
             className=" rounded-[15px]"
            />
            </div>
          </div>
        </SignedOut>

        {/* Signed-In Navigation Header */}
        <SignedIn>
          <div
            className="w-full border-b bg-[#081f5c]"
          >
            <div className="flex items-center h-[35px] justify-between pl-[88.54px] pt-[37px] w-full">
              
              {/* User Profile Button */}
              <div className="flex items-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;


