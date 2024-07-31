"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Banner = () => {
  const router = useRouter();
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="w-full px-[8px] md:px-[15px] lg:px-[40px] xl:px-[55px] mt-[26px] md:mt-[34px] lg:mt-[40px] h-[262px] md:h-[390px] lg:h-[500px] ">
      <div className="relative h-full banner-gradient w-full rounded-[50px] md:rounded-[70px] lg:rounded-[80px] banner-shadow">
        <motion.div 
          className="absolute xl:w-[147px] xl:h-[155px] w-[74px] h-[52px] md:h-[71px] lg:w-[110px] lg:h-[110px] left-[2%] top-[34%] lg:top-[30%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Image
            src="/assets/images/Ellipse3.png"
            alt="Eclipse"
            width={147}
            height={155}
          />
        </motion.div>
        <motion.div 
          className="absolute w-[41px] md:w-[70px] h-[37px] md:h-[63px] lg:w-[100px] lg:h-[90px] left-[44%] top-[19%] lg:top-[22%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Image
            src="/assets/images/Ellipse4.png"
            alt="Eclipse"
            width={160}
            height={146}
          />
        </motion.div>
        <motion.div 
          className="absolute xl:w-[147px] xl:h-[154px] w-[40px] md:w-[72px] h-[34px] md:h-[75px] lg:w-[110px] lg:h-[115px] left-[60%] top-[66%] lg:top-[64%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Image
            src="/assets/images/Ellipse5.png"
            alt="Eclipse"
            width={147}
            height={154}
          />
        </motion.div>
        <motion.div 
          className="absolute w-[30px] md:w-[50px] h-[32px] md:h-[50px] lg:w-[70px] lg:h-[70px] left-[90%] md:left-[92%] top-[83%] lg:top-[80%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Image
            src="/assets/images/Ellipse6.png"
            alt="Eclipse"
            width={126}
            height={131}
          />
        </motion.div>
        <div className="w-full h-full flex items-center justify-between pl-[7%]">
          <motion.div 
            className="flex flex-col gap-[30px] md:gap-[45px] lg:gap-[55px]"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1 }}
          >
            <h1 className="banner-h1-shadow md:text-[27px] lg:text-[45px] leading-[54px] md:leading-[55px] lg:leading-[75px] tracking-widest font-bold text-[22px]">
              Get your new Books
              <span><br />at the best price</span>
            </h1>
            <p className="text-gray-600 md:text-[18px] lg:text-[22px] leading-[16px] md:leading-[18px] lg:leading-[28px]">
              Turning pages, sharing stories
            </p>
            <Button 
              onClick={()=> router.push("/books")} 
              className="md:mt-[60px] lg:mt-[90px] text-[11px] md:text-[18px] xl:text-[24px] lg:text-[23px] w-[85px] md:w-[180px] xl:w-[230px] lg:w-[220px] h-[30px] md:h-[60px] bg-[#2F457F] rounded-xl md:rounded-[20px] lg:rounded-[22px] text-white banner-btn-shadow font-normal bg-opacity-70"
            >
              Start Browsing
            </Button>
          </motion.div>
          <motion.div 
            className="w-[120px] md:w-[240px] h-[182px] md:h-[370px] lg:w-[300px] lg:h-[460px] xl:w-[340px]"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5}}
          >
            <Image
              src="/assets/images/banner-hero.png"
              alt="Book"
              width={446}
              height={632}
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
