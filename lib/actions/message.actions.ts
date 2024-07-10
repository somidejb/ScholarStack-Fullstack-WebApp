"use server";

import { connectToDatabase } from "../mongodb/database";
import Chat from "../mongodb/database/models/chat.model";
import Message from "../mongodb/database/models/message.model";
import { handleError, toPusherKey } from "../utils";
import User from "../mongodb/database/models/user.model";
import { pusherServer } from "../pusher";

type getMessageProps = {
    chatId: string | undefined;
    currentUserId: string;
    text: string;
    photo: string;
}

export async function getMessage({ chatId, currentUserId, text, photo }: getMessageProps) {
    try {
        if (!chatId) {
            throw new Error("chatId is undefined");
        }

        await connectToDatabase();
        const currentUser = await User.findById(currentUserId);

        const newMessage = await Message.create({
            chat: chatId,
            sender: currentUser,
            text,
            photo,
            seenBy: currentUserId,
        });
        console.log(newMessage)

        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            {
                $push: {
                    messages: newMessage._id,
                },
                $set: { lastMessageAt: newMessage.createdAt },
            },
            {
                new: true,
            }
        ).populate({
            path: "messages",
            model: Message,
            populate: { path: "sender seenBy", model: "User" },
        }).populate({
            path: "members",
            model: "User",
        }).exec();

        await pusherServer.trigger(toPusherKey(`chat:${chatId}`), "incoming-message", newMessage)
        const lastMessage = updatedChat.messages[updatedChat.messages.length - 1];
        console.log("Last message:", lastMessage);
        
        updatedChat.members.forEach(async (member: any) => {
            try{
                await pusherServer.trigger(toPusherKey(`user:${member._id.toString()}`), "update-chat", {
                    id: chatId,
                    messages: [lastMessage]
                });
            }
            catch (error) {
                console.error("Error sending pusher update:", error);
            }
        })

        if (!updatedChat) throw new Error('Message not sent');

        return JSON.parse(JSON.stringify(newMessage));
    } catch (error) {
        handleError(error);

    }
}
