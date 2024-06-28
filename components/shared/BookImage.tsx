import Image from 'next/image';

type BookImageProps = {
  imageUrl: string;
  title: string;
};

const BookImage: React.FC<BookImageProps> = ({ imageUrl, title }) => {
  return (
    <div className="relative transition-transform duration-300 ease-in-out transform hover:scale-110 w-[150px] h-[200px] sm:w-[180px] sm:h-[240px] md:w-[290px] md:h-[400px] lg:w-[370px] lg:h-[500px] xl:w-[446px] xl:h-[600px]">
      <Image
        src={imageUrl}
        alt={title}
        width={500}
        height={312}
        className="mb-2"
      />
    </div>
  );
};

export default BookImage;
