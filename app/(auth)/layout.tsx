import Image from 'next/image';
import React from 'react';

 

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex-center pt-10 min-h-screen w-full bg-[#D6DAEA] bg-cover bg-center">
      <div className="w-full flex md:flex-row flex-col gap-2 items-center md:items-start">
        <div className="flex items-center flex-col w-full  md:w-1/2">
          <div className="text-[20px] md:text-[35px] leading-[24px] md:leading-[42px] font-bold flex flex-col text-end">
            <h1>
              Welcome to ScholarStack-<span className="h1-gradient"> where</span>
            </h1>
            <h2 className ="h1-gradient">every book finds</h2>
            <h2 className="h1-gradient">a new home</h2>            
          </div>
          <div className="flex justify-center h-[280px] lg:h-[500px] sm:h-full">
            <Image src="/assets/images/saly.png" priority={true} alt="hero" width={750} height={750} className="object-contain" />
          </div>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};


export default Layout;
