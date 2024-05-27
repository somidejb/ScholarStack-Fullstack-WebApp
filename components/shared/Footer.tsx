import React from 'react';
import { FaEnvelope, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#081F5C] text-white py-4">
      <div className="flex justify-between">
        <div className="p-2">
          <h2 className="text-[#FFFFFF] font-bold ">ScholarStack</h2>
          <p className='text-nowrap'>
            Where every book finds a new <br />
            home and every reader <br />
            discovers their next adventure!
          </p>
        </div>
        <div className="p-2">
          <h2>Help & Contacts </h2>
          <div className="flex items-center">
            <FaEnvelope />
            <p className="ml-2">scholarstack@gmail.com</p>
          </div>
          <div className="flex items-center mt-2 ml-auto">
            <FaTwitter />
          </div>
        </div>
      </div>

      <hr className="border-t border-blue-300 my-4" />
      <div className="p-2 text-center">
        <p className="text-[#FFFFFF]">
        © All copyrights are reserved. ScolarStack 2024. 
        </p>
      </div>
    </footer>
  );
};

export default Footer;
