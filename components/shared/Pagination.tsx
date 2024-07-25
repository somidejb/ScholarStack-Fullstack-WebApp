"use client";
import React from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  pageNumber: number;
  isNext: boolean;
}

const Pagination = ({ pageNumber, isNext }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextPageNumber = direction === "prev" ? pageNumber - 1 : pageNumber + 1;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });
    router.push(newUrl);
  };

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
        className="bg-[#31457b] text-white border flex min-h-[36px] items-center justify-center gap-2"
      >
        <p>Prev</p>
      </Button>
      <div className="flex justify-center items-center rounded-md px-3.5 py-2">
        <p>{pageNumber}</p>
      </div>
      <Button
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
        className="bg-[#31457b] text-white border flex min-h-[36px] items-center justify-center gap-2"
      >
        <p>Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
