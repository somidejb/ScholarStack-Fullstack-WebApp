import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface ChatBoxProps {
  onSendMessage: (message: string) => void;
  className?: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ onSendMessage, className }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={`p-4 border-t border-gray-300 ${className} flex items-center`}>
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="w-full p-2 border rounded-lg"
        placeholder="Write a message"
      />
      <button onClick={handleSend} className="p-2">
        <FontAwesomeIcon
          icon={faPaperPlane}
          height={18}
          width={18}
          style={{ color: "#000000" }}
        />
      </button>
    </div>
  );
};

export default ChatBox;
















// import React, { useState } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

// interface ChatBoxProps {
//   onSendMessage: (message: string) => void;
//   className?: string;
// }

// const ChatBox: React.FC<ChatBoxProps> = ({ onSendMessage, className }) => {
//   const [message, setMessage] = useState('');

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setMessage(e.target.value);
//   };

//   const handleSend = () => {
//     if (message.trim() !== '') {
//       onSendMessage(message);
//       setMessage('');
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       handleSend();
//     }
//   };

//   return (
//     <div className={`p-4 border-t border-gray-300 ${className} flex items-center`}>
//       <input
//         type="text"
//         value={message}
//         onChange={handleInputChange}
//         onKeyPress={handleKeyPress}
//         className="w-full p-2 border rounded-lg"
//         placeholder="Write a message"
//       />
//       <button onClick={handleSend} className="p-2">
//         <FontAwesomeIcon
//           icon={faPaperPlane}
//           height={18}
//           width={18}
//           style={{ color: "#000000" }}
//         />
//       </button>
//     </div>
//   );
// };

// export default ChatBox;
