import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface Chat {
  name: string;
  message: string;
}

interface Message {
  sender: string;
  content: string;
}

interface ChatWindowProps {
  selectedChat: Chat | null;
  messages: Message[];
  onBack?: () => void;
  className?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedChat, messages, onBack, className }) => {
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
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
              <div className={`${msg.sender === 'You' ? 'bg-indigo-100' : 'bg-gray-200'} p-2 rounded-lg`}>
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
