"use client";
import React, { useState } from 'react';
import ChatBox from '@/components/shared/ChatBox';
import ChatList from '@/components/shared/ChatList';
import ChatWindow from '@/components/shared/ChatWindow';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

interface Chat {
  name: string;
  message: string;
  time: string;
}

const MessagingPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const chats: Chat[] = [
    { name: 'David Carlson', message: 'Hey, How are you?', time: '3:20PM' },
    { name: 'Lily Bloom', message: 'You in Sunridge, right?', time: '9:20PM' },
    { name: 'Josh Seary', message: 'Hey, we meeting tmrw for book...', time: '3:29PM' },
    { name: 'Chris Brown', message: 'Hey, so when did u bought this...', time: '8:00PM' },
    { name: 'Lei Wong', message: 'I would love to buy this book', time: '11:20AM' },
  ];

  const handleBack = () => {
    setSelectedChat(null);
  };

  return (
    <div>
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow overflow-hidden">
        <div className={`w-full ${selectedChat ? 'hidden' : 'block'} md:block md:w-1/3 border-r border-gray-300`}>
          <ChatList chats={chats} onSelectChat={setSelectedChat} className="w-full h-full border-r border-gray-300" />
        </div>
        <div className={`flex flex-col flex-grow ${selectedChat ? 'block' : 'hidden'} md:block`}>
          <div className="flex flex-col h-full">
            <ChatWindow selectedChat={selectedChat} onBack={handleBack} className="flex-grow overflow-y-auto" />
            <ChatBox className="w-full" />
          </div>
        </div>
      </div>
      
    </div>
    <Footer/>
    </div>
  );
};

export default MessagingPage;
