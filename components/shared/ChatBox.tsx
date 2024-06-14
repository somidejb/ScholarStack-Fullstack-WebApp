import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface ChatBoxProps {
  className?: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ className }) => {
  return (
    <div className={`p-4 border-t border-gray-300 ${className}  p-3 border-t border-gray-300 flex items-center`}>
      <input
        type="text"
        className="w-full p-2 border rounded-lg"
        placeholder="Write a message"
      />
       <button className="p-2">
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
