import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="container mx-auto px-4 py-8">
        <div className="bg-[linear-gradient(108.56deg,#FFFFFF_2.22%,#D6DAEA_95.84%)] p-8 rounded-[50px] md:rounded-[100px] shadow-lg flex items-center space-x-2 relative">
          <div className="text-center flex-1 relative md:center">
            <Image
              src="/assets/images/Ellipse3.png"
              alt="Eclipse"
              width={74}
              height={52}
              className="xs:left-1 absolute bottom-1/2 transform -translate-x-1/2 translate-y-1/5 md:w-24 md:h-24 md:left-4 top-[30px] align-middle md: w-[68] h-[71]"
            />
            <h1
              className="font-inter text-xl md:text-2xl leading-7 tracking-wider font-extrabold text-[22px] whitespace-nowrap relative"
              style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", zIndex: "1" }}
            >
              Get your new book
              <span className="block  xs:text-left "> 
                at the best price
              </span>
             
              <Image
                src="/assets/images/Ellipse4.png"
                alt="Eclipse"
                width={41}
                height={37}
                className="absolute xs:right-5 top-0 transform -translate-x-1/2 translate-y-1/5 md:w-24 md:h-24 md:left-[260px]"
                style={{ zIndex: "-1" }}
              />
            </h1>
            <p className="text-gray-600 mt-4 whitespace-nowrap bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 relative md:text-[18px]"
            >Turning pages, sharing stories
            <Image
                src="/assets/images/Ellipse5.png"
                alt="Eclipse"
                width={40}
                height={34.04}
                className="absolute transform -translate-x-1/4 -translate-y-1/5 md:w-40 md:h-34 md:left-[350px] md:top-[2px] xs:left-[180px]"
                style={{ zIndex: "-1" }} 
              />
            </p>

            <button className="mt-16 px-6 py-2 bg-[#2F457F] rounded-xl text-white text-xs font-normal mr-16"
             style={{ zIndex: "1" }}>
              Start Browsing
            </button> 
          </div>
          <div className="relative flex-1">
            <Image
              src="/assets/images/black.png"
              alt="Book"
              width={300}
              height={300}
              className="rounded-[50px] md:rounded-[100px] md:right-3 "
            />
            <Image
              src="/assets/images/Ellipse4.png"
              alt="Eclipse"
              width={29.75}
              height={31.55}
              className="absolute bottom-0 md:right-3 xs:right-2 transform translate-x-1/4 -translate-y-3/5 md:w-24 md:h-24 md:top-[320px]"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Banner;



