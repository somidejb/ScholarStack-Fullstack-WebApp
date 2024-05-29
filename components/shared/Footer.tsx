import React from 'react';
import { FaEnvelope, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#081F5C] text-white py-4  bg-blue-800 bg-opacity-80">
      <div className="flex justify-between ">
        <div className="p-1 ml-1">
          <h2 className=" font-inter font-bold text-white text-base leading-7">ScholarStack</h2>
          <p className='text-nowrap font-inter font-normal text-white text-xs tracking-tighter'>
            Where every book finds a new <br />
            home and every reader <br />
            discovers their next adventure!
          </p>
        </div>
        <div className="p-2 mr-1 font-inter font-semibold text-white text-base leading-24">
          <h2>Help & Contacts </h2>
          <div className="flex items-center">
            <FaEnvelope />
            <p className="ml-2 font-inter font-normal text-white text-xs leading-24">scholarstack@gmail.com</p>
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


/* Where every book finds a new home and every reader discovers their next adventure! */

// position: absolute;
// width: 150px;
// height: 30px;
// left: 3px;
// top: 1225px;



