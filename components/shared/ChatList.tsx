"use client";
import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoChatbubbleOutline } from "react-icons/io5";
import ChatWindow from "./ChatWindow";
import ChatCard from "./ChatCard";
import { getChatsById } from "@/lib/actions/user.actions";
import { getMessage } from "@/lib/actions/message.actions";
import { addToSeenBy } from "@/lib/actions/chat.actions";
import { getUsersByUsername } from "@/lib/actions/user.actions"; // Import the new function
import { IChat } from "@/lib/mongodb/database/models/chat.model";
import { IUser } from "@/lib/mongodb/database/models/user.model";
import Link from "next/link";

interface ChatListProps {
  className?: string;
  userId: string;
  currentUser: IUser;
}

const ChatList = ({ className, userId, currentUser }: ChatListProps) => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);
  const [messages, setMessages] = useState<{ [key: string]: any[] }>({});
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<IUser[]>([]);

  const getChats = async () => {
    try {
      const chats = await getChatsById(userId);
      setChats(chats);
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

  const handleSearchInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setSearchInput(input);

    if (input.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const users = await getUsersByUsername(input);
      setSearchResults(users);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.participants.some(participant =>
      participant.username.toLowerCase().includes(searchInput.toLowerCase())
    )
  );

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
              placeholder="Search chat..."
              className="px-5 py-2.5 border w-full rounded-2xl bg-white outline-none"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
          <div>
            {searchInput ? (
              searchResults.length === 0 ? (
                <div className="mt-4 flex flex-col items-center text-gray-500 font-semibold text-lg md:text-sm lg:text-lg">
                  <p>No users found with username "{searchInput}"</p>
                </div>
              ) : (
                searchResults.map((user, index) => (
                  <div key={index} className="mt-4 flex flex-col items-center text-gray-500 font-semibold text-lg md:text-sm lg:text-lg">
                    <p>{user.username}</p>
                    {/* Add any other user information you want to display */}
                  </div>
                ))
              )
            ) : (
              filteredChats.length === 0 ? (
                <div className="mt-4 flex flex-col items-center text-gray-500 font-semibold text-lg md:text-sm lg:text-lg">
                  <img src="/assets/images/no-chat.png" alt="No chats" className="w-16 h-16" />
                  <p>Find the book you're interested in</p>
                  <p>Click on Message Seller to start a chat</p>
                  <p>Happy browsing!</p>
                  <Link href="/books" className="my-1 rounded-md bg-[#31457B] p-2 text-white text-sm">
                    Explore Books
                  </Link>
                </div>
              ) : (
                filteredChats.map((chat, index) => (
                  <ChatCard
                    key={index}
                    chat={chat}
                    index={index}
                    userId={userId}
                    handleSelectChat={handleSelectChat}
                    currentUser={currentUser}
                    chats={chats}
                    setChats={setChats}
                  />
                ))
              )
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
