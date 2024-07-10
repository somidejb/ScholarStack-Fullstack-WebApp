import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoChatbubbleOutline } from "react-icons/io5";
import Image from "next/image";

interface Chat {
  name: string;
  message: string;
  time: string;
  avatar: string;
  isOpened: boolean;
}

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
  className?: string;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  onSelectChat,
  className,
}) => {
  return (
    <div className={`p-4 overflow-y-auto ${className}`}>
      <div className=" p-0.5">
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
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100`}
            onClick={() => onSelectChat(chat)}
          >
            <div className="flex items-center">
              <img src={chat.avatar} alt={`${chat.name}'s avatar`} className="chat-avatar w-10 h-10 rounded-full mr-2" />
              <div>
                <h3 className="text-sm">{chat.name}</h3>
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









// "use client";

// import { useSession } from "@clerk/nextjs";
// import React, { useState, useEffect } from "react";
// import { IoIosAddCircleOutline } from "react-icons/io";
// import { IoChatbubbleOutline } from "react-icons/io5";
// import ChatListUser from "./ChatListUser";
// import Contacts from "./Contacts";

// interface Chat {
//   _id: string;
//   name: string;
//   message: string;
//   time: string;
//   members: string[];
// }

// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// interface ChatListProps {
//   //currentChatId: string;
// }

// const ChatList: React.FC<ChatListProps> = () => {
//   const { session } = useSession();
//   const [loading, setLoading] = useState(false);
//   const [chats, setChats] = useState<Chat[]>([]);
//   const currentUser = session?.user;

//   const getChats = async () => {
//     if (!currentUser || !currentUser.id) {
//       console.log("Current user is not defined");
//       return;
//     }

//     try {
//       const res = await fetch(`/api/users/${currentUser.id}`);
//       const data = await res.json();
//       setChats(data);
//       setLoading(false);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     if (currentUser) {
//       getChats();
//     }
//   }, [currentUser]);

//   return (
//     <div className={`p-4 overflow-y-auto`}>
//       <input
//         placeholder="Search chat.."
//         className="px-5 py-3 border w-full rounded-2xl bg-white outline-none"
//       />
//       <div className="border-b p-0.5">
//         <div className="flex justify-between items-center mb-4">
//           <button className="text-xl">
//             <IoChatbubbleOutline size={20} />
//           </button>
//           <h2 className="text-xl font-bold">My conversations</h2>
//           <IoIosAddCircleOutline size={20} />
//         </div>
//       </div>
//       <div>
//         <Contacts />
//         {/* {currentUser && chats.map((chat, index) => (
//           <ChatListUser key={chat._id} chat={chat} index={index} currentUser={currentUser} />
//         ))} */}
//       </div>
//     </div>
//   );
// };

// export default ChatList;
