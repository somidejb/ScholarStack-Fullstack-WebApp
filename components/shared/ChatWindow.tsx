import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ChatBox from "@/components/shared/ChatBox";

interface Chat {
  name: string;
  message: string;
  avatar: string;
}

interface Message {
  sender: string;
  content: string;
}

interface ChatWindowProps {
  selectedChat: Chat | null;
  messages: Message[];
  onBack?: () => void;
  onSendMessage: (message: string) => void;
  className?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  selectedChat,
  messages,
  onBack,
  onSendMessage,
  className,
}) => {
  if (!selectedChat) {
    return (
      <div className={`flex-grow flex items-center justify-center ${className}`}>
        Select a chat to start messaging
      </div>
    );
  }

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
          src={selectedChat.avatar}
          alt={`${selectedChat.name}'s avatar`}
          className="w-10 h-10 rounded-full mr-2"
        />
        <h3 className="text-lg font-semibold">{selectedChat.name}</h3>
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
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  msg.sender === "You" ? "bg-indigo-100" : "bg-gray-200"
                } p-2 rounded-lg`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ChatBox onSendMessage={onSendMessage} className="w-full" />
    </div>
  );
};

export default ChatWindow;

















// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEllipsis, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import Image from "next/image";

// interface Chat {
//   name: string;
//   message: string;
// }

// interface Message {
//   sender: string;
//   content: string;
// }

// interface ChatWindowProps {
//   selectedChat: Chat | null;
//   messages: Message[];
//   onBack?: () => void;
//   className?: string;
// }

// const ChatWindow: React.FC<ChatWindowProps> = ({ selectedChat, messages, onBack, className }) => {
//   if (!selectedChat) {
//     return (
      
     
//       <div className={`flex-grow flex items-center justify-center ${className}`}>
//         <Image
//          src="/assets/images/chatpage_img.png"
//          alt="Eclipse"
//          width={140}
//          height={126}/>
//         <p className="text-xl"> Select a chat to start messaging </p>
//       </div>
     
//     );
//   }

//   return (
//     <div className={`flex flex-col h-full ${className}`}>
//       <div className="border-b p-4 flex items-center">
//         {onBack && (
//           <button className="mr-4 md:hidden" onClick={onBack}>
//             <FontAwesomeIcon
//               icon={faArrowLeft}
//               height={15}
//               width={15}
//               style={{ color: "#000000" }}
//             />
//           </button>
//         )}
//         <img
//           src="/profile.jpg"
//           alt="Profile"
//           className="h-8 w-8 rounded-full mr-2"
//         />
//         <h3 className="text-lg font-semibold">{selectedChat.name}</h3>
//         <FontAwesomeIcon
//           icon={faEllipsis}
//           height={15}
//           width={15}
//           style={{ color: "#000000" }}
//           className="ml-auto"
//         />
//       </div>
//       <div className="flex-grow p-4 overflow-y-auto bg-white">
//         <div className="flex flex-col space-y-4">
//           {messages.map((msg, index) => (
//             <div key={index} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
//               <div className={`${msg.sender === 'You' ? 'bg-indigo-100' : 'bg-gray-200'} p-2 rounded-lg`}>
//                 <p className="text-sm">{msg.content}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;
