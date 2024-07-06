import React from 'react';
import { FaEnvelope, FaTwitter, FaFacebookSquare, FaInstagramSquare } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bottom-0 w-full text-white bg-[#31457b] rounded-sm">
      <div className="flex justify-between p-0">
        <div className="p-1 ml-1">
          <h2 className="font-inter font-bold text-white text-base leading-7 lg:text-[40px] lg:mb-3">ScholarStack</h2>
          <p className="text-nowrap font-inter font-normal text-white text-xs md:text-[12px] tracking-tighter lg:text-[15px]">
            Where every book finds a new <br />
            home and every reader <br />
            discovers their next adventure!
          </p>
        </div>
        <div className="p-2 mr-1 font-inter font-semibold text-white text-base leading-24">
          <h2>Help & Contacts</h2>
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
      <hr className="border-blue-300 " />
      <div className="text-center">
        <p className="text-[#FFFFFF]">
          © All copyrights are reserved. ScholarStack 2024.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
