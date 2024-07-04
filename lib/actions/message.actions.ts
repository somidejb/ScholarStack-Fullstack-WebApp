"use server";

import { io } from "@/app/api/socket"; // Import the Socket.IO server instance
import { connectToDatabase } from "../mongodb/database";
import Chat from "../mongodb/database/models/chat.model";
import Message from "../mongodb/database/models/message.model";
import { handleError } from "../utils";
import User from "../mongodb/database/models/user.model";

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

        if (!updatedChat) throw new Error('Message not sent');

        // Emit the new message event to the specific chat room
        if (io) {
            io.to(chatId).emit("new-message", newMessage);
        }

        return JSON.parse(JSON.stringify(newMessage));
    } catch (error) {
        handleError(error);
    }
}
