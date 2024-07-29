import { getUserById2 } from '@/lib/actions/user.actions';
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
    chats: IChat[];
    setChats: React.Dispatch<React.SetStateAction<IChat[]>>;
}

const ChatCard = ({ chat, index, userId, handleSelectChat, currentUser, chats,  setChats }: ChatCardProps) => {
    const lastMessage = chat?.messages.length > 0 ? chat.messages[chat.messages.length - 1] : undefined;
    const seen = Array.isArray(lastMessage?.seenBy) && lastMessage?.seenBy.find((member) => member._id === userId);
    console.log("Seen:", seen);

    const otherMember = chat?.members?.filter((member) => member._id !== currentUser._id);

    // Determine the other member in the chat
    const otherMemberId = chat?.members.find((member) => member._id !== userId)?._id; 
    console.log("present user Id: ", userId)
    console.log("Other member:", otherMember);
    console.log("Other member photo:", otherMember[0]?.photo);
    const formattedCreatedDate = formatDateTime(new Date(chat?.createdAt));
    const formattedLastDate = formatDateTime(new Date(chat?.lastMessageAt));
    const { timeOnly: lastMessageTime } = formattedLastDate;
    const { timeOnly } = formattedCreatedDate;
    const router = useRouter();


    if (!otherMember) {
        return null; // or a loading indicator
    }

    console.log("set chats type: ", typeof setChats);

    useEffect(() => {
        if(currentUser){
            pusherClient.subscribe(userId);

            const handleChatUpdate = (updatedChat: IChat) => {
                setChats((allChats) => allChats.map((chat) => {
                    if(chat._id === updatedChat._id){
                        return updatedChat;
                    }else{
                        return chat;
                    }
                }))
            }

            pusherClient.bind("update-chat", handleChatUpdate);

            return () => {
                pusherClient.unsubscribe(userId);
                pusherClient.unbind("update-chat", handleChatUpdate);
            }
        }
    }, [currentUser]);

    return (
        <div
            key={index}
            className="flex justify-between items-center p-2 cursor-pointer"
            onClick={() => handleSelectChat(chat)}
        >
            <div className="flex items-center">
                <img src={otherMember[0]?.photo} alt={`${otherMember[0]?.username}'s avatar`} className="chat-avatar w-10 h-10 rounded-full mr-2" />
                <div>
                    <h3 className="text-sm">{otherMember[0]?.username}</h3>
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