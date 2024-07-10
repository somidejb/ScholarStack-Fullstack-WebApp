"use client";
import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoChatbubbleOutline } from "react-icons/io5";
import ChatWindow from "./ChatWindow";
import ChatCard from "./ChatCard";
import { getChatsById } from "@/lib/actions/user.actions";
import { getMessage } from "@/lib/actions/message.actions";
import { addToSeenBy } from "@/lib/actions/chat.actions";
import { IChat } from "@/lib/mongodb/database/models/chat.model";
import { IUser } from "@/lib/mongodb/database/models/user.model";

interface ChatListProps {
  className?: string;
  userId: string;
  currentUser: IUser;
}

const ChatList = ({ className, userId, currentUser }: ChatListProps) => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);
  const [messages, setMessages] = useState<{ [key: string]: any[] }>({});

  const getChats = async () => {
    try {
      const chats = await getChatsById(userId);
      setChats(chats);
      console.log("Chats:", chats);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getChats();
    }
  }, [userId]);

  const handleBack = () => {
    setSelectedChat(null);
  };

  const seenMessages = async () => {
    try {
      if (selectedChat?._id) {
        await addToSeenBy(selectedChat._id, userId);
      }
    } catch (error) {
      console.log("Error adding seen by:", error);
    }
  };

  useEffect(() => {
    if (currentUser && selectedChat?._id) {
      seenMessages();
    }
  }, [currentUser, selectedChat?._id]);

  const handleSendMessage = async (message: string) => {
    if (selectedChat) {
      const messageData = await getMessage({
        chatId: selectedChat._id,
        currentUserId: userId,
        text: message,
        photo: "",
      });

      if (messageData) {
        const chatId = selectedChat._id;
        setMessages((prevMessages) => ({
          ...prevMessages,
          [chatId]: [...(prevMessages[chatId] || []), messageData],
        }));
      }
    }
  };

  const handleSelectChat = (chat: IChat) => {
    setSelectedChat(chat);
    if (chat._id) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [chat._id]: chat.messages,
      }));
    }
  };

  return (
    <div className="flex flex-grow overflow-hidden p-4 space-x-4">
      <div className={`w-full ${selectedChat ? "hidden" : "block"} md:block md:w-1/3`}>
        <div className={`p-4 overflow-y-auto ${className}`}>
          <div className="p-0.5">
            <div className="flex justify-between items-center mb-4">
              <button className="text-xl">
                <IoChatbubbleOutline size={20} />
              </button>
              <h2 className="text-xl font-bold">My conversations</h2>
              <IoIosAddCircleOutline size={20} />
            </div>
            <input
              placeholder="Search chat.."
              className="px-5 py-2.5 border w-full rounded-2xl bg-white outline-none"
            />
          </div>
          <div>
            {chats.length === 0 ? (
              <div className="text-center text-gray-500 mt-4">No conversations available</div>
            ) : (
              chats.map((chat, index) => (
                <ChatCard
                  key={index}
                  chat={chat}
                  index={index}
                  userId={userId}
                  handleSelectChat={handleSelectChat}
                  currentUser={currentUser}
                  setChats={setChats}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className={`flex flex-col flex-grow ${selectedChat ? "block" : "hidden"} md:block`}>
        <div className="flex flex-col h-full shadow-lg rounded-lg bg-white">
          {selectedChat ? (
            <ChatWindow
              selectedChat={selectedChat}
              onBack={handleBack}
              userId={userId}
              className="flex-grow overflow-y-auto"
              onSendMessage={handleSendMessage}
              messages={messages[selectedChat._id] || []}
            />
          ) : (
            <div className={`flex-grow flex items-center justify-center overflow-y-auto`}>
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
