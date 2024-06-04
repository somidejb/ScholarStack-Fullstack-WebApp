import React from "react";

interface Chat {
  name: string;
  message: string;
}

interface ChatWindowProps {
  selectedChat: Chat | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedChat }) => {
  if (!selectedChat) {
    return (
      <div className="flex-grow p-4 overflow-y-auto">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex-grow p-4 overflow-y-auto bg-white">
      <div className="flex items-center mb-4">
        <img
          src="/profile.jpg"
          alt="Profile"
          className="h-8 w-8 rounded-full mr-2"
        />
        <h3 className="text-lg font-semibold">{selectedChat.name}</h3>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-sm">
          <p>{selectedChat.name}</p>
          <div className="flex items-start">
            <img
              src="/profile.jpg"
              alt="Profile"
              className="h-6 w-6 rounded-full mr-2"
            />
            <div className="bg-gray-200 p-2 rounded-lg">
              <p className="text-sm">{selectedChat.message}</p>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-end">
          
          <div className="bg-indigo-100 p-2 rounded-lg">
            <p className="text-sm">Hey</p>
          </div>
          <img
            src="/profile.jpg"
            alt="Profile"
            className="h-6 w-6 rounded-full ml-2"
          />
        </div>
     
      </div>
    </div>
  );
};

export default ChatWindow;
