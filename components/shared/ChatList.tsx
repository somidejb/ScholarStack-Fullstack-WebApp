import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

interface Chat {
  name: string;
  message: string;
  time: string;
}

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
  className?: string;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat, className }) => {
  return (
    <div className={`p-4 overflow-y-auto ${className}`}>
      <div className="border-b p-0.5">
        <div className="flex justify-between items-center mb-4">
          <button className="text-xl">
            <FontAwesomeIcon
              icon={faComment}
              height={15}
              width={15}
              style={{ color: "#000000" }}
            />
          </button>
          <h2 className="text-xl font-bold">My conversations</h2>
          <button className="text-lg">+</button>
        </div>
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