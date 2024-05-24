import Image from 'next/image';
import React from 'react'

const BookCard = () => {
  return (
    <div className = "container relative rounded-[15px] lg:rounded-[30px] flex min-h-[135px] max-w-[104px] w-full flex-col overflow-hidden lg:min-h-[394px] lg:max-h-[258px] card-shadow">
        <div className = "p-[7px]">
            <Image 
                src="/assets/images/book1.png" 
                alt="book" 
                width={90} 
                height={90} 
                className="drop-shadow-lg object-contain rounded-[10px] lg:rounded-[20px] filter drop-shadow-[0px 4px 4px rgba(0, 0, 0, 0.25)]"    
            />
        </div>
    </div>
  )
}/* Rectangle 135 */




export default BookCard

