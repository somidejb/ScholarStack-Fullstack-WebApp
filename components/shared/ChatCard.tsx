import { getUserById } from '@/lib/actions/user.actions';
import { IChat } from '@/lib/mongodb/database/models/chat.model';
import { IUser } from '@/lib/mongodb/database/models/user.model';
import { pusherClient } from '@/lib/pusher';
import { formatDateTime, toPusherKey } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface ChatCardProps {
    chat: IChat;
    index: number;
    userId: string;
    handleSelectChat: (chat: IChat) => void;
    currentUser: IUser;
    setChats: React.Dispatch<React.SetStateAction<IChat[]>>;
}

const ChatCard = ({ chat, index, userId, handleSelectChat, currentUser, setChats }: ChatCardProps) => {
    const lastMessage = chat?.messages.length > 0 ? chat.messages[chat.messages.length - 1] : undefined;
    const seen = Array.isArray(lastMessage?.seenBy) && lastMessage?.seenBy.find((member) => member._id === userId);
    console.log("Seen:", seen);
    const [otherMember, setOtherMember] = useState<any>(null);

    // Determine the other member in the chat
    const otherMemberId = chat?.members.find((member) => member._id !== userId)?._id; 
    console.log("present user Id: ", userId)
    console.log("Other member:", otherMember);
    const formattedCreatedDate = formatDateTime(new Date(chat?.createdAt));
    const formattedLastDate = formatDateTime(new Date(chat?.lastMessageAt));
    const { timeOnly: lastMessageTime } = formattedLastDate;
    const { timeOnly } = formattedCreatedDate;
    const router = useRouter();

    useEffect(() => {
        const fetchOtherMember = async () => {
            if (otherMemberId) {
                const fetchedMember = await getUserById(otherMemberId);
                setOtherMember(fetchedMember);
            }
        };

        fetchOtherMember();
    }, [otherMemberId]);

    if (!otherMember) {
        return null; // or a loading indicator
    }

    // useEffect(() => {
    //     if(currentUser){
    //         pusherClient.subscribe(toPusherKey(`chat:${currentUser._id}`));

    //         // const handleChatUpdate = (updatedChat: IChat) => {
    //         //     setChats((allChats) => allChats.map((chat) => {
    //         //         if(chat._id === updatedChat._id){
    //         //             return {...chat, messages: updatedChat.messages};
    //         //         } else{
    //         //             return chat;
    //         //         }
    //         //     }))
    //         }

    //         pusherClient.bind("update-chat", handleChatUpdate)

    //         return() => {
    //             pusherClient.unsubscribe(toPusherKey(`chat:${currentUser._id}`));
    //             pusherClient.unbind("update-chat", handleChatUpdate);
    //         }
    //     }
    // }, [currentUser]);

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
                    {!lastMessage ? ( <p className={`text-xs ${seen ? "text-gray-500" : "text-gray-500 font-bold"}`}>Started a chat</p>):
                    (<p className={`text-xs text-gray-500 ${!seen && "font-bold"}`}>{lastMessage?.text}</p>)}
                </div>
            </div>
            <p className="text-xs text-gray-500">
                {!lastMessage ? timeOnly : lastMessageTime}
            </p>
        </div>
    );
};

export default ChatCard;
