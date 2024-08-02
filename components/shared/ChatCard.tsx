import { getUserById } from '@/lib/actions/user.actions';
import { IChat } from '@/lib/mongodb/database/models/chat.model';
import { IUser } from '@/lib/mongodb/database/models/user.model';
import { pusherClient } from '@/lib/pusher';
import { formatDateTime } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatCardProps {
    chat: IChat;
    index: number;
    userId: string;
    handleSelectChat: (chat: IChat) => void;
    currentUser: IUser;
    chats: IChat[];
    setChats: React.Dispatch<React.SetStateAction<IChat[]>>;
}

const ChatCard = ({ chat, index, userId, handleSelectChat, currentUser, chats, setChats }: ChatCardProps) => {
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
        // Only run effect logic if currentUser is present
        if (!currentUser) return;

        pusherClient.subscribe(userId);

        const handleChatUpdate = (updatedChat: any) => {
            setChats((allChats: any) =>
                allChats.map((chat: IChat) => {
                    if (chat._id === updatedChat.id) {
                        return { ...chat, messages: updatedChat.messages };
                    } else {
                        return chat;
                    }
                })
            );
        };

        const handleNewChat = (newChat: any) => {
            setChats((allChats) => [...allChats, newChat]);
        };

        pusherClient.bind("update-chat", handleChatUpdate);
        pusherClient.bind("new-chat", handleNewChat);

        return () => {
            pusherClient.unsubscribe(userId);
            pusherClient.unbind("update-chat", handleChatUpdate);
            pusherClient.unbind("new-chat", handleNewChat);
        };
    }, [currentUser, userId, setChats]);

    return (
        <AnimatePresence>
            <motion.div
                key={index}
                className="flex justify-between items-center p-2 cursor-pointer"
                onClick={() => handleSelectChat(chat)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
            >
                <div className="flex items-center">
                    <img src={otherMember[0]?.photo} alt={`${otherMember[0]?.username}'s avatar`} className="chat-avatar w-10 h-10 rounded-full mr-2" />
                    <div>
                        <h3 className="text-sm">{otherMember[0]?.username}</h3>
                        {!lastMessage ? (
                            <p className={`text-xs ${seen ? "text-gray-500" : "text-gray-500 font-bold"}`}>
                                Started a chat
                            </p>
                        ) : (
                            <p className={`text-xs text-gray-500 ${!seen && "font-bold"}`}>
                                {lastMessage?.text}
                            </p>
                        )}
                    </div>
                </div>
                <p className="text-xs text-gray-500">
                    {!lastMessage ? timeOnly : lastMessageTime}
                </p>
            </motion.div>
        </AnimatePresence>
    );
};

export default ChatCard;
