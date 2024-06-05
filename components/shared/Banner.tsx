import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <section className="w-full px-[8px] md:px-[15px] lg:px-[40px] xl:px-[66px] mt-[26px] md:mt-[34px] lg:mt-[40px] h-[262px] md:h-[660px] lg:h-[741px] xl:h-[821px]">
      <div className="relative h-full banner-gradient w-full rounded-[50px] md:rounded-[70px] lg:rounded-[80px] banner-shadow">
        <div className="absolute xl:w-[147px] xl:h-[155px] w-[74px] h-[52px] md:h-[71px] lg:w-[110px] lg:h-[110px] left-[2%] top-[34%] lg:top-[30%]">
          <Image
            src="/assets/images/Ellipse3.png"
            alt="Eclipse"
            width={147}
            height={155}
          />
        </div>
        <div className="absolute xl:w-[160px] xl:h-[146px] w-[41px] md:w-[70px] h-[37px] md:h-[63px] lg:w-[100px] lg:h-[90px] left-[44%] top-[19%] lg:top-[22%]">
          <Image
            src="/assets/images/Ellipse4.png"
            alt="Eclipse"
            width={160}
            height={146}
          />
        </div>
        <div className="absolute xl:w-[147px] xl:h-[154px] w-[40px] md:w-[72px] h-[34px] md:h-[75px] lg:w-[110px] lg:h-[115px] left-[60%] top-[66%] lg:top-[64%]">
          <Image
            src="/assets/images/Ellipse5.png"
            alt="Eclipse"
            width={147}
            height={154}
          />
        </div>
        <div className="absolute xl:w-[126px] xl:h-[131px] w-[30px] md:w-[68px] h-[32px] md:h-[70px] lg:w-[95px] lg:h-[100px] left-[90%] top-[83%] lg:top-[80%]">
          <Image
            src="/assets/images/Ellipse6.png"
            alt="Eclipse"
            width={126}
            height={131}
          />
        </div>
        <div className="w-full h-full flex items-center justify-between pl-[7%]">
          <div className="flex flex-col gap-[30px] md:gap-[90px] lg:gap-[100px] xl:gap-[120px]">
            <h1
              className="banner-h1-shadow md:text-[40px] xl:text-[70px] lg:text-[55px] leading-[54px] md:leading-[80px] xl:leading-[90px] lg:leading-[85px] tracking-widest font-bold text-[22px]"
            >
              Get your new book<br />at the best price
            </h1>
            <p className="text-gray-600 md:text-[18px] xl:text-[25px] lg:text-[22px] leading-[16px] md:leading-[18px] xl:leading-[32px] lg:leading-[28px]">
              Turning pages, sharing stories
            </p>

            <button className="md:mt-[100px] lg:mt-[120px] text-[11px] md:text-[22px] xl:text-[24px] lg:text-[23px] w-[85px] md:w-[210px] xl:w-[230px] lg:w-[220px] h-[30px] md:h-[74px] bg-[#2F457F] rounded-xl md:rounded-[20px] lg:rounded-[22px] text-white banner-btn-shadow font-normal bg-opacity-70">
              Start Browsing
            </button>
          </div>
          <div className="w-[120px] md:w-[290px] h-[182px] md:h-[455px] xl:w-[446px] xl:h-[632px] lg:w-[370px] lg:h-[540px]">
            <Image
              src="/assets/images/banner-hero.png"
              alt="Book"
              width={446}
              height={632}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
