import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
   <div className="min-h-screen flex items-center justify-center">
      <main className="w-full md:w-[100%] lg:w-[100%] xl:w-[100%] px-4 py-8 mx-auto W-[100%] -[100%]">
        <div className="bg-[linear-gradient(108.56deg,#FFFFFF_2.22%,#D6DAEA_95.84%)] p-8 rounded-[50px] md:rounded-[50px] shadow-lg flex flex-row md:flex-row items-center space-x-1 relative lg:h-[650px] md:h-[500px]">
          <div className="text-left flex-1 relative">
            <Image
              src="/assets/images/Ellipse3.png"
              alt="Eclipse"
              width={74}
              height={52}
              className="left-1 absolute bottom-1/2 transform -translate-x-1/2 translate-y-1/5 md:w-24 md:h-24 md:left-4 top-[30px]"
            />
            <h1
              className="font-inter md:text-[40px] leading-7 tracking-wider font-extrabold text-[22px] whitespace-nowrap relative text-left lg:text-[70px]"
              style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", zIndex: "1" }}
            >
              Get your new book
              <span className="block text-left md:mt-6 lg:mt-12"> 
                at the best price
              </span>
             
              <Image
                src="/assets/images/Ellipse4.png"
                alt="Eclipse"
                width={41}
                height={37}
                className="absolute left-[150px] top-0 transform -translate-x-1/2 translate-y-1/5 md:w-24 md:h-24 md:left-[300px] lg:left-[500px]"
                style={{ zIndex: "-1" }}
              />
            </h1>
            <p className="text-gray-600 mt-4 whitespace-nowrap bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 relative md:text-[22px] text-left mb-[150px] lg:text-left text-[13px] lg:text-[25px]">
              Turning pages, sharing stories
              <Image
                src="/assets/images/Ellipse5.png"
                alt="Eclipse"
                width={40}
                height={34.04}
                className="absolute transform -translate-x-1/4 -translate-y-1/5 md:w-40 md:h-34 md:left-[250px] md:top-[2px] left-[180px]"
                style={{ zIndex: "-1" }} 
              />
            </p>

            <button className="mt-[100px] px-6 py-2 bg-[#2F457F] rounded-xl text-white font-normal text-left bg-opacity-80 text-[11px] md:[22px] lg:text-[24px]"
              style={{ zIndex: "1" }}>
              Start Browsing
            </button> 
          </div>
          <div className="relative flex-1 items-center justify-center md:justify-start">
            <div className="flex items-center justify-center h">
              <Image
                src="/assets/images/black.png"
                alt="Book"
                width={300}
                height={300}
                className="object-fill  h-auto w-auto md:w-[400px] md:h-[400px] md:object-fil lg:object-fill"
              />
            </div>
            <Image
              src="/assets/images/Ellipse4.png"
              alt="Eclipse"
              width={29.75}
              height={31.55}
              className="absolute bottom-0 md:right-10 right-2 transform translate-x-1/4 -translate-y-3/5 md:w-24 md:h-24 md:top-[300px]"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Banner;
