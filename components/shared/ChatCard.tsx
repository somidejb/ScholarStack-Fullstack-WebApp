import { getUserById } from '@/lib/actions/user.actions';
import { IChat } from '@/lib/mongodb/database/models/chat.model';
import { formatDateTime } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface ChatCardProps {
    chat: IChat;
    index: number;
    userId: string;
    handleSelectChat: (chat: IChat) => void;
}

const ChatCard = ({ chat, index, userId, handleSelectChat }: ChatCardProps) => {
    const lastMessage = chat?.messages.length > 0 ? chat.messages[chat.messages.length - 1] : undefined;
    const seen = Array.isArray(lastMessage?.seenBy) && lastMessage?.seenBy.find((member) => member._id === userId);
    console.log("Seen:", seen);
    const [otherMember, setOtherMember] = useState<any>(null);
    const otherMemberId = chat?.members[1]._id; // Convert ObjectId to string
    const formattedCreatedDate = formatDateTime(new Date(chat?.createdAt));
    const formattedLastDate = formatDateTime(new Date(chat?.lastMessageAt));
    const { timeOnly: lastMessageTime } = formattedLastDate;
    const { timeOnly } = formattedCreatedDate;
    const router = useRouter();

    useEffect(() => {
        const fetchOtherMember = async () => {
            const fetchedMember = await getUserById(otherMemberId);
            setOtherMember(fetchedMember);
        };

        fetchOtherMember();
    }, [otherMemberId]);

    if (!otherMember) {
        return null; // or a loading indicator
    }

    return (
        <div
            key={index}
            className="flex justify-between items-center p-2 cursor-pointer"
            onClick={() => handleSelectChat(chat)}
        >
            <div className="flex items-center">
                <img src={otherMember.photo} alt={`${otherMember.username}'s avatar`} className="chat-avatar w-10 h-10 rounded-full mr-2" />
                <div>
                    <h3 className="text-sm">{otherMember.username}</h3>
                    {!lastMessage ? ( <p className={`text-xs ${seen? "text-gray-500" : "text-gray-500 font-bold"}`}>Started a chat</p>):
                    (<p className="text-xs text-gray-500">{lastMessage?.text}</p>)}
                </div>
            </div>
            <p className="text-xs text-gray-500">
                {!lastMessage ? timeOnly : lastMessageTime}
            </p>
        </div>
    );
};

export default ChatCard;
