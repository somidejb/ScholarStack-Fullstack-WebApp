import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface Chat {
  name: string;
  message: string;
}

interface ChatWindowProps {
  selectedChat: Chat | null;
  onBack?: () => void;
  className?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedChat, onBack, className }) => {
  if (!selectedChat) {
    return (
      <div className={`flex-grow flex items-center justify-center ${className}`}>
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="border-b p-4 flex items-center">
        {onBack && (
          <button className="mr-4 md:hidden" onClick={onBack}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              height={15}
              width={15}
              style={{ color: "#000000" }}
            />
          </button>
        )}
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
          className="ml-auto"
        />
      </div>
      <div className="flex-grow p-4 overflow-y-auto bg-white">
        <div className="flex flex-col space-y-4">
          <div className="text-sm">
            <div className="flex flex-row items-start text-sm">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="h-5 w-5 rounded-full"
              />
              <p className="ml-2">{selectedChat.name}</p>
            </div>
            <div className="flex items-start">
              <div className="bg-gray-200 p-2 rounded-lg">
                <p className="text-sm">{selectedChat.message}</p>
              </div>
            </div>
          </div>
          <div className="text-sm">
            <div className="flex flex-col items-end">
              <div className="flex flex-row items-center">
                <p className="pt-2">You</p>
                <img
                  src="/profile.jpg"
                  alt="Profile"
                  className="h-5 w-5 rounded-full ml-2"
                />
              </div>
              <div className="bg-indigo-100 p-2 rounded-lg">
                <p className="text-sm">Hey</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
