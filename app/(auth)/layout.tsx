import Image from 'next/image';
import React from 'react';

 

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="justify-center items-center pt-10 min-h-screen w-full bg-[#D6DAEA] bg-cover bg-center">
      <div className="flex md:flex-row flex-col gap-2">
        <div className="items-center w-[50%]">
          <div className="text-[35px] leading-[42px] font-bold font-inter flex flex-col justify-end text-end">
            <h1>
              Welcome to ScholarStack-<span className="bg-gradient-to-45 from-[#D6DAEA] to-[#A6A9CE] bg-clip-text text-transparent text-right"> where</span>
            </h1>
            <h2 className ="bg-gradient-to-45 from-[#D6DAEA] to-[#A6A9CE] bg-clip-text text-transparent text-right">every book finds</h2>
            <h2 className="bg-gradient-to-45 from-[#D6DAEA] to-[#A6A9CE] bg-clip-text text-transparent text-right">a new home</h2>            
          </div>
          <div className="flex justify-end">
            <Image src="/assets/images/saly.png" priority={true} alt="hero" width={450} height={450} className="object-contain" />
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
