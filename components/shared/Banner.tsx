import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="container mx-auto px-4 py-8">
        <div className="bg-[linear-gradient(108.56deg,#FFFFFF_2.22%,#D6DAEA_95.84%)] p-8 rounded-[50px] md:rounded-[100px] shadow-lg flex items-center space-x-2 relative">
          <div className="text-center flex-1 relative">
            <Image
              src="/assets/images/Ellipse3.png"
              alt="Eclipse"
              width={60}
              height={60}
              className="absolute bottom-1/2 left-6 transform -translate-x-1/2 translate-y-1/5 md:w-24 md:h-24"
            />
            <h1
              className="font-inter text-xl md:text-2xl leading-7 tracking-wider font-extrabold text-[22px] whitespace-nowrap"
              style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
            >
              Get your new book
              <br />
              at the best price
              <Image
              src="/assets/images/Ellipse4.png"
              alt="Eclipse"
              width={60}
              height={60}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-1/5 md:w-24 md:h-24"
            />
            </h1>
            <p className="text-gray-600 mt-4 whitespace-nowrap">Turning pages, sharing stories</p>

            <Image
              src="/assets/images/Ellipse5.png"
              alt="Eclipse"
              width={60}
              height={60}
              className="absolute top-1/2 right-1 transform -translate-x-1/4 -translate-y-1/5 md:w-24 md:h-24"
            />
            <button className="mt-6 px-6 py-2 bg-[#2F457F] rounded-xl text-white">
              Start Browsing
            </button>
          </div>
          <div className="relative flex-1">
            <Image
              src="/assets/images/black.png"
              alt="Book"
              width={300}
              height={300}
              className="rounded-[50px] md:rounded-[100px]"
            />
            <Image
              src="/assets/images/Ellipse4.png"
              alt="Eclipse"
              width={60}
              height={60}
              className="absolute bottom-0 right-0 transform translate-x-1/4 -translate-y-3/5 md:w-24 md:h-24"
            />
         
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default Banner;




