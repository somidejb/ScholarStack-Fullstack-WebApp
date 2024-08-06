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
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface ChatListProps {
  className?: string;
  userId: string;
  currentUser: IUser;
}

const ChatList = ({ className, userId, currentUser }: ChatListProps) => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [filteredChats, setFilteredChats] = useState<IChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);
  const [messages, setMessages] = useState<{ [key: string]: any[] }>({});
  const [searchQuery, setSearchQuery] = useState("");

  const getChats = async () => {
    try {
      const chats = await getChatsById(userId);
      setChats(chats);
      setFilteredChats(chats);
      console.log("Chats:", chats);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

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
      console.log("Messages in the handle select chat:", messages);
    }
  };
  useEffect(() => {
    if (currentUser) {
      getChats();
    }
  }, [currentUser]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query.trim() !== "") {
      const filtered = chats.filter((chat) =>
        chat.members.some((member) =>
          member.username.toLowerCase().includes(query)
        )
      );
      setFilteredChats(filtered);
    } else {
      setFilteredChats(chats);
    }
  };

  return (
    <div className="h-full flex flex-grow overflow-hidden p-4 gap-4">
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
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <AnimatePresence>
            {filteredChats.length === 0 ? (
              <motion.div 
                className="mt-4 flex flex-col items-center text-gray-500 font-semibold text-lg md:text-sm lg:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <img src="/assets/images/no-chat.png" alt="No chats" className="w-16 h-16" />
                <p>Find the book you're interested in</p>
                <p>Click on Message Seller to start a chat</p>
                <p>Happy browsing!</p>
                <Link href="/books" className="my-1 rounded-md bg-[#31457B] p-2 text-white text-sm">Explore Books</Link>
              </motion.div>
            ) : (
              filteredChats.map((chat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <ChatCard
                    key={index}
                    chat={chat}
                    index={index}
                    userId={userId}
                    handleSelectChat={handleSelectChat}
                    currentUser={currentUser}
                    chats={filteredChats}
                    setChats={setFilteredChats}
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
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
            <div className={`flex-grow flex items-center justify-center overflow-y-auto ${className}`}>
              <div className="text-center p-4">
                <img src="/assets/icons/chat.png" alt="Chat Icon" className="mx-auto mb-4 w-16 h-16" />
                <div className="text-gray-500 text-xl font-semibold">
                  Select a chat to start messaging
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;