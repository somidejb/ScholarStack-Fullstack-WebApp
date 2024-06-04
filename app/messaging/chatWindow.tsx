import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

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
      <div className="border-b">
        <div className="flex items-center mb-4">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="h-8 w-8 rounded-full mr-2"
          />

          <h3 className="text-lg font-semibold">{selectedChat.name}</h3>

          <FontAwesomeIcon
            icon={faEllipsis}
            height={15}
            width={15}
            style={{ color: "#000000" }}
            className="pl-[800px]"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="text-sm">
          <div className="flex flex-row items-start text-sm">
            <img
              src="/profile.jpg"
              alt="Profile"
              className="h-5 w-5 rounded-full "
            />
            <p>{selectedChat.name}</p>
          </div>
          <div className="flex items-start ">
            <div className="bg-gray-200 p-2 rounded-lg">
              <p className="text-sm">{selectedChat.message}</p>
            </div>
          </div>
        </div>

        <div className="text-sm">
          <div className="flex flex-col items-end ">
            <div className="flex flex-row">
              <p className="pt-2">You</p>
          <img
              src="/profile.jpg"
              alt="Profile"
              className="h-5 w-5 rounded-full mt-2"
            />
            </div>
            <div className="bg-indigo-100 p-2 rounded-lg">
              <p className="text-sm">Hey</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
