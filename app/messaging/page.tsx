"use client";
import React, { useState } from 'react';
import ChatBox from './chatBox';
import ChatList from './chatList';
import ChatWindow from './chatWindow';

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

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <ChatList chats={chats} onSelectChat={setSelectedChat} className="w-full md:w-1/3 border-r border-gray-300" />
      <div className="flex flex-col flex-grow">
        <ChatWindow selectedChat={selectedChat} className="flex-grow" />
        <ChatBox  />
      </div>
    </div>
  );
};

export default MessagingPage;
