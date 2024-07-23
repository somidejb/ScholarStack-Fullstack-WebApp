import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ChatBox from "@/components/shared/ChatBox";
import { IChat } from "@/lib/mongodb/database/models/chat.model";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { IMessage } from "@/lib/mongodb/database/models/message.model";
import {motion} from 'framer-motion'

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
    }
  }, [selectedChat, messages]);

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`chat:${selectedChat?._id}`),
    )
    const messageHandler = (message: IMessage) => {
      setChatMessages((prev) => [message, ...prev])
    }

    pusherClient.bind("incoming-message", messageHandler);
    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`chat:${selectedChat?._id}`),
      )
      pusherClient.unbind("incoming-message", messageHandler)
    }
  }, [])


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
    <motion.div
      className={`flex flex-col h-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
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
      <motion.div
        className="flex-grow p-4 overflow-y-auto bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="flex flex-col space-y-4">
          {chatMessages.map((msg, index) => (
            <motion.div
              key={index}
              className={`flex ${msg.sender?._id !== userId ? 'justify-start' : 'justify-end'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <div className={`p-2 rounded-lg ${msg.sender?._id !== userId ? 'bg-gray-200' : 'bg-indigo-100'}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </motion.div>
          ))}
          <div ref={bottomRef}></div>
        </div>
      </motion.div>
      <ChatBox onSendMessage={onSendMessage} className="w-full" />
    </motion.div>
  );
};

export default ChatWindow;