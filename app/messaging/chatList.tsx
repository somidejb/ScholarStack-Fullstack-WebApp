import React from 'react';

const ChatList = ({ chats, onSelectChat }) => {
  return (
    <div className="lg:w-1/3 border-r border-gray-300 p-4 overflow-y-auto w-full md:w-1/3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My conversations</h2>
        <button className="text-xl">+</button>
      </div>
      <div>
        {chats.map((chat, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelectChat(chat)}
          >
            <div className="flex items-center">
              <img src="/profile.jpg" alt="Profile" className="h-8 w-8 rounded-full mr-2" />
              <div>
                <h3 className="text-sm font-semibold">{chat.name}</h3>
                <p className="text-xs text-gray-500">{chat.message}</p>
              </div>
            </div>
            <div className="text-xs text-gray-500">{chat.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
