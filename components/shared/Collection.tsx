// components/shared/Collection.tsx
type Book = {
  id: string;
  title: string;
  author: string;
  price: string;
  imageUrl: string; // Ensure this matches the field name in your API response
  condition: string;
  description: string;
  category: string;
};

type CollectionProps = {
  collection_type: string;
  books: Book[];
};

export const Collection = ({ collection_type, books }: CollectionProps) => {
  return (
    <section className="mt-[60px] lg:mt-[88px] items-center flex flex-col">
      <h2 className="text-center leading-[27px] md:leading-[36px] lg:leading-[73px] text-[22px] md:text-[30px] lg:text-[42px] tracking-widest font-normal">{collection_type}</h2>
      <div className="w-full card-center flex items-center mt-[8px] md:mt-[38px] lg:mt-[50px] relative">
        <div onClick={handlePrevClick} className="absolute z-10 left-[12px] md:left-[30px] lg:left-[45px] cursor-pointer">
          <Image src="/assets/icons/left-icon.png" alt="Left Arrow" width={24} height={24} />
        </div>
        <div className="flex overflow-hidden w-full">
          <div 
            className="flex gap-[22px] md:gap-[36px] transition-transform duration-500"
            style={{ transform: `translateX(-${currentSlide * 100 / totalSlides}%)` }}
          >
            {books.map((book, index) => (
              <div key={index} className={`flex  w-[${100 / cardsPerSlide}%]`}>
                <BookCard 
                  title={book.title}
                  imageUrl={book.image}
                  author={book.author}
                  price={book.price}
                />
              </div>
            ))}
          </div>
        </div>
        <div onClick={handleNextClick} className="absolute right-[12px] md:right-[30px] lg:right-[45px] z-10 cursor-pointer">
          <Image src="/assets/icons/right-icon.png" alt="Right Arrow" width={24} height={24} />
        </div>
      </div>
      <div className="flex w-full items-center mt-[24px] md:mt-[30px] card-center">
        <div className="flex justify-center flex-grow">
          {renderDots()}
        </div>
        <Link href="">
          <p className="cursor-pointer text-normal leading-[16px] md:leading-[23px] lg:leading-[32px] text-[11px] md:text-[16px] lg:text-[23px] tracking-widest text-[#2F27CE]">See more</p>
        </Link>
      </div>
    </section>
  );
};


