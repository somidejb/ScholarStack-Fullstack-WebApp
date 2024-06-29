"use client";
import React, { useState } from "react";
import ChatBox from "@/components/shared/ChatBox";
import ChatList from "@/components/shared/ChatList";
import ChatWindow from "@/components/shared/ChatWindow";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

interface Chat {
  name: string;
  message: string;
  time: string;
  avatar: string;
  isOpened: boolean;
}

interface Message {
  sender: string;
  content: string;
  avatar: string;
}

const MessagingPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({
    "David Carlson": [
      { sender: "David Carlson", content: "Hey, How are you?", avatar: "/assets/images/p1.png" },
    ],
    "Lily Bloom": [
      { sender: "Lily Bloom", content: "You in Sunridge, right?", avatar: "/assets/images/p5.png" },
    ],
    "Josh Seary": [
      { sender: "Josh Seary", content: "Hey, we meeting tmrw for book...", avatar: "/assets/images/p2.png" },
    ],
    "Chris Brown": [
      { sender: "Chris Brown", content: "Hey, so when did u bought this...", avatar: "/assets/images/p3.png" },
    ],
    "Lei Wong": [
      { sender: "Lei Wong", content: "I would love to buy this book", avatar: "/assets/images/p4.png" },
    ],
  });

  const [chats, setChats] = useState<Chat[]>([
    { name: "David Carlson", message: "Hey, How are you?", time: "3:20PM", avatar: "assets/images/p1.png", isOpened: false },
    { name: "Lily Bloom", message: "You in Sunridge, right?", time: "9:20PM", avatar: "assets/images/p5.png", isOpened: false },
    {
      name: "Josh Seary",
      message: "Hey, we meeting tmrw for book...",
      time: "3:29PM",
      avatar: "assets/images/p2.png",
      isOpened: false,
    },
    {
      name: "Chris Brown",
      message: "Hey, so when did u bought this...",
      time: "8:00PM",
      avatar: "assets/images/p3.png",
      isOpened: false,
    },
    {
      name: "Lei Wong",
      message: "I would love to buy this book",
      time: "11:20AM",
      avatar: "assets/images/p4.png",
      isOpened: false,
    },
  ]);

  const handleBack = () => {
    setSelectedChat(null);
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.isOpened ? { ...chat, isOpened: false } : chat
      )
    );
  };

  const handleSendMessage = (message: string) => {
    if (selectedChat) {
      const chatName = selectedChat.name;
      const newMessage = { sender: "You", content: message, avatar: "" };
      setMessages((prevMessages) => ({
        ...prevMessages,
        [chatName]: [...(prevMessages[chatName] || []), newMessage],
      }));
      setChats((prevChats) => {
        const updatedChats = prevChats.map((chat) =>
          chat.name === chatName
            ? { ...chat, message: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            : chat
        );
        return updatedChats;
      });
    }
  };

  const handleSelectChat = (chat: Chat) => {
    setChats((prevChats) => {
      const updatedChats = prevChats.map((c) =>
        c.name === chat.name ? { ...c, isOpened: true } : c
      );
      return updatedChats;
    });
    setSelectedChat(chat);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-grow overflow-hidden p-4 space-x-4">
          <div
            className={`w-full ${
              selectedChat ? "hidden" : "block"
            } md:block md:w-1/3`}
          >
            <ChatList
              chats={chats}
              onSelectChat={handleSelectChat}
              className="w-full h-full shadow-lg rounded-lg bg-white"
            />
          </div>
          <div
            className={`flex flex-col flex-grow ${
              selectedChat ? "block" : "hidden"
            } md:block`}
          >
            <div className="flex flex-col h-full shadow-lg rounded-lg bg-white">
              <ChatWindow
                selectedChat={selectedChat}
                messages={selectedChat ? messages[selectedChat.name] || [] : []}
                onBack={handleBack}
                className="flex-grow overflow-y-auto"
                onSendMessage={handleSendMessage}
              />
              
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MessagingPage;









// "use client";
// import React, { useState } from "react";
// import ChatBox from "@/components/shared/ChatBox";
// import ChatList from "@/components/shared/ChatList";
// import ChatWindow from "@/components/shared/ChatWindow";
// import Header from "@/components/shared/Header";
// import Footer from "@/components/shared/Footer";
// import Contacts from "@/components/shared/Contacts";

// interface Chat {
//   name: string;
//   message: string;
//   time: string;
// }

// interface Message {
//   sender: string;
//   content: string;
// }

// const MessagingPage: React.FC = () => {
//   const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
//   const [messages, setMessages] = useState<{ [key: string]: Message[] }>({
//     "David Carlson": [
//       { sender: "David Carlson", content: "Hey, How are you?" },
//     ],
//     "Lily Bloom": [
//       { sender: "Lily Bloom", content: "You in Sunridge, right?" },
//     ],
//     "Josh Seary": [
//       { sender: "Josh Seary", content: "Hey, we meeting tmrw for book..." },
//     ],
//     "Chris Brown": [
//       { sender: "Chris Brown", content: "Hey, so when did u bought this..." },
//     ],
//     "Lei Wong": [
//       { sender: "Lei Wong", content: "I would love to buy this book" },
//     ],
//   });

//   const chats: Chat[] = [
//     { name: "David Carlson", message: "Hey, How are you?", time: "3:20PM" },
//     { name: "Lily Bloom", message: "You in Sunridge, right?", time: "9:20PM" },
//     {
//       name: "Josh Seary",
//       message: "Hey, we meeting tmrw for book...",
//       time: "3:29PM",
//     },
//     {
//       name: "Chris Brown",
//       message: "Hey, so when did u bought this...",
//       time: "8:00PM",
//     },
//     {
//       name: "Lei Wong",
//       message: "I would love to buy this book",
//       time: "11:20AM",
//     },
//   ];

//   const handleBack = () => {
//     setSelectedChat(null);
//   };

//   const handleSendMessage = (message: string) => {
//     if (selectedChat) {
//       const chatName = selectedChat.name;
//       setMessages((prevMessages) => ({
//         ...prevMessages,
//         [chatName]: [
//           ...(prevMessages[chatName] || []),
//           { sender: "You", content: message },
//         ],
//       }));
//     }
//   };

//   return (
//     <div>
//       <div className="flex flex-col h-screen">
//         <Header />
//         <div className="flex flex-grow overflow-hidden">
//           <div
//             className={`w-full ${
//               selectedChat ? "hidden" : "block"
//             } md:block md:w-1/3 border-r border-gray-300`}
//           >
//             {/* for chatList here */}
//             <div className="w-full h-full border-r border-gray-300"> <ChatList /></div>
            
//           </div>
//           <div
//             className={`flex flex-col flex-grow ${
//               selectedChat ? "block" : "hidden"
//             } md:block`}
            
//           >
//             <div className="flex flex-col h-full">
//               <ChatWindow
//                 selectedChat={selectedChat}
//                 messages={selectedChat ? messages[selectedChat.name] || [] : []}
//                 onBack={handleBack}
//                 className="flex-grow overflow-y-auto"
//               />
//               <ChatBox onSendMessage={handleSendMessage} className="w-full" />
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default MessagingPage;
