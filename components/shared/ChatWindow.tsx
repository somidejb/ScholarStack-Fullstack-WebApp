import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ChatBox from "@/components/shared/ChatBox";
import { IChat } from "@/lib/mongodb/database/models/chat.model";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { IMessage } from "@/lib/mongodb/database/models/message.model";
import Link from "next/link";
import {format} from 'date-fns';

interface ChatWindowProps {
  selectedChat: IChat | null;
  userId: string;
  onBack?: () => void;
  onSendMessage: (message: string) => void;
  className?: string;
  messages: IMessage[];
}

const ChatWindow = ({
  selectedChat,
  onBack,
  userId,
  onSendMessage,
  className,
  messages,
}: ChatWindowProps) => {
  const [chatMessages, setChatMessages] = useState<IMessage[]>(messages || []);

  useEffect(() => {
    if (selectedChat) {
      setChatMessages(messages);
    }
  }, [selectedChat, messages]);

  useEffect(() => {
    if (selectedChat?._id) {
      pusherClient.subscribe(selectedChat._id);
    }

    const messageHandler = (message: IMessage) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    };

    pusherClient.bind("new-message", messageHandler);
    return () => {
      if (selectedChat?._id) {
        pusherClient.unsubscribe(selectedChat._id);
      }
      pusherClient.unbind("new-message", messageHandler);
    };
  }, []);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  console.log("Chat Messages:", chatMessages);
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
        <Link href={`/profile/${selectedChat?.members[0]?._id}`}>
          <img
            src={selectedChat?.members[0]?.photo}
            alt={`${selectedChat?.members[0]?.username}'s avatar`}
            className="w-10 h-10 rounded-full mr-2"
          />
        </Link>
        <h3 className="text-lg font-semibold">{selectedChat?.members[0]?.username}</h3>
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
              <div key={index} className="flex justify-start items-start flex-col">
                <div className="flex items-center">
                  <img src={msg?.sender?.photo} alt="profile photo" className="w-8 h-8 rounded-full"/>
                  <p className = "text-xs font-bold pl-2">{msg?.sender?.username} &#160; &#183; &#160; {format(new Date(msg?.createdAt), "p")}</p>
                </div>
                <div className="ml-10 bg-gray-200 p-2 rounded-lg">
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ) : (
              <div key={index} className="flex justify-end items-end flex-col">
                <p className="text-xs font-bold">{format(new Date(msg?.createdAt), "p")}</p>
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <p className="text-sm ">{msg.text}</p>
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
