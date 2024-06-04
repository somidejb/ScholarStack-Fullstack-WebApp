import React from 'react';

const ChatBox = () => {
  return (
    <div className="p-4 border-t border-gray-300 flex items-center">
      <input 
        type="text" 
        placeholder="Write a message" 
        className="flex-grow p-2 border rounded-full mr-2"
      />
      <button className="p-2">
        <img src="/send-icon.png" alt="Send" className="h-6 w-6"/>
      </button>
    </div>
  );
};

export default ChatBox;