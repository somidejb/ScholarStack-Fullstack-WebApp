import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaEnvelope, FaTwitter, FaFacebookSquare, FaInstagramSquare } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-white py-4 bg-[#31457b] rounded-sm">
      <div className="flex justify-between ">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/images/scholarstacklogo.png"
            alt="ScholarStackLogo"
            width={37.38}
            height={35}
          />
          <h2 className="text-[20px] lg:text-[24px] text-white font-semibold font-['PT_Serif']">
            ScholarStack
          </h2>
        </div>
        <div className="p-2 mr-1 font-inter font-semibold text-white text-base leading-24">
          <h2>Help & Contacts </h2>
          <div className="flex items-center hover:cursor-pointer">
            <FaEnvelope />
            <p className="ml-2 font-inter font-normal text-white text-xs leading-24">scholarstack@gmail.com</p>
          </div>
          <div className="flex mt-10 justify-end space-x-3">
            <a
              href="https://www.facebook.com/ScholarStack"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:cursor-pointer"
            >
              <FaFacebookSquare />
            </a>
            <a
              href="https://www.instagram.com/ScholarStack"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:cursor-pointer"
            >
              <FaInstagramSquare />
            </a>
            <a
              href="https://www.twitter.com/ScholarStack"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:cursor-pointer"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
      <hr className="border-blue-300 my-4" />
      <div className="p-2 text-center">
        <p className="text-[#FFFFFF] text-[10px]">
          © All copyrights are reserved. ScholarStack 2024.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
