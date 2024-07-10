import React from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';

type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, images, selectedIndex, onSelect }) => {
  if (!isOpen) return null;

  const handlePrev = () => {
    if (selectedIndex > 0) {
      onSelect(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex < images.length - 1) {
      onSelect(selectedIndex + 1);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-2xl w-auto h-auto sm:max-w-lg md:max-w-xl lg:max-w-3xl">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="h-6 w-6" />
        </button>
        <div className="flex items-center justify-center">
          <button
            onClick={handlePrev}
            className="text-gray-500 hover:text-gray-700 absolute left-0 top-1/2 transform -translate-y-1/2"
            disabled={selectedIndex === 0}
          >
            <FaArrowLeft className="h-6 w-6" />
          </button>
          <div className="flex flex-col items-center justify-center mx-4">
            <Image src={images[selectedIndex]} alt="Enlarged Image" width={500} height={500} className="rounded-lg" />
            <div className="mt-4 flex lg:flex-row space-y-2 overflow-x-auto">
              {images.map((image: string, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  width={50}
                  height={50}
                  className={`cursor-pointer rounded-md ${index === selectedIndex ? 'border-2 border-indigo-500' : 'border border-gray-300'}`}
                  onClick={() => onSelect(index)}
                />
              ))}
            </div>
          </div>
          <button
            onClick={handleNext}
            className="text-gray-500 hover:text-gray-700 absolute right-0 top-1/2 transform -translate-y-1/2"
            disabled={selectedIndex === images.length - 1}
          >
            <FaArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
