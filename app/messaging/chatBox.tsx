import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPaperPlane } from "@fortawesome/free-solid-svg-icons";


const ChatBox = () => {
  return (
    <div className="p-4 border-t border-gray-300  flex items-center focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0">
      <input 
        type="text" 
        placeholder="Write a message" 
        className="flex-grow p-2 border rounded-full mr-2 shadow-md"
      />
      <button className="p-2">
      <FontAwesomeIcon
          icon={faPaperPlane}
          height={18}
          width={18}
          style={{ color: "#000000" }}
        />
      </button>
    </div>
  );
};

export default ChatBox;
