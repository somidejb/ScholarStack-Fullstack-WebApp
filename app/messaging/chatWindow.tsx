import React from 'react';

const ChatWindow = ({ selectedChat }) => {
  if (!selectedChat) {
    return <div className="flex-grow p-4 overflow-y-auto">Select a chat to start messaging</div>;
  }

  return (
    <div className="flex-grow p-4 overflow-y-auto">
      <div className="flex items-center mb-4">
        <img src="/profile.jpg" alt="Profile" className="h-8 w-8 rounded-full mr-2" />
        <h3 className="text-lg font-semibold">{selectedChat.name}</h3>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex items-start">
          <img src="/profile.jpg" alt="Profile" className="h-6 w-6 rounded-full mr-2" />
          <div className="bg-gray-200 p-2 rounded-lg">
            <p className="text-sm">{selectedChat.message}</p>
          </div>
        </div>
        <div className="flex items-end justify-end">
          <div className="bg-blue-200 p-2 rounded-lg">
            <p className="text-sm">Hey</p>
          </div>
          <img src="/profile.jpg" alt="Profile" className="h-6 w-6 rounded-full ml-2" />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
