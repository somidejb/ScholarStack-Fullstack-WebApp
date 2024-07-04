import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ChatBox from "@/components/shared/ChatBox";
import { IChat } from "@/lib/mongodb/database/models/chat.model";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  path: "/api/socket",
});

interface ChatWindowProps {
  selectedChat: IChat | null;
  userId: string;
  onBack?: () => void;
  onSendMessage: (message: string) => void;
  className?: string;
  messages: any[];
}

const ChatWindow = ({
  selectedChat,
  onBack,
  userId,
  onSendMessage,
  className,
  messages,
}: ChatWindowProps) => {
  const [chatMessages, setChatMessages] = useState(messages);

  useEffect(() => {
    if (selectedChat) {
      setChatMessages(messages);
      socket.emit("join-chat", selectedChat._id);

      socket.on("new-message", (message) => {
        setChatMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off("new-message");
      };
    }
  }, [selectedChat, messages]);

  if (!selectedChat) {
    return (
      <div className={`flex-grow flex items-center justify-center ${className}`}>
        Select a chat to start messaging
      </div>
    );
  }

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

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
          src={selectedChat?.members[1].photo}
          alt={`${selectedChat?.members[1].username}'s avatar`}
          className="w-10 h-10 rounded-full mr-2"
        />
        <h3 className="text-lg font-semibold">{selectedChat.members[1].username}</h3>
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
          {chatMessages.map((msg, index) => (
            msg?.sender?._id !== userId ? (
              <div key={index} className="flex justify-start">
                <div className="bg-gray-200 p-2 rounded-lg">
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ) : (
              <div key={index} className="flex justify-end">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            )
          ))}
          <div ref={bottomRef}></div>
        </div>
      </div>
      <ChatBox onSendMessage={onSendMessage} className="w-full" />
    </div>
  );
};

export default ChatWindow;
