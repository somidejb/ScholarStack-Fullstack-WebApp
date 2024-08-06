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
        console.log("new message from getMessage(): ",newMessage)

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
            model: User,
        }).exec();

        /*Trigger a pusher event about a specific chat about a new message */
        await pusherServer.trigger(chatId, "new-message", newMessage)

        if (!updatedChat) throw new Error('Message not sent');
        const lastMessage = updatedChat.messages[updatedChat.messages.length - 1];
        console.log("Last message:", lastMessage);
        
        updatedChat.members.forEach(async (member: any) => {
            try{
                await pusherServer.trigger(member._id.toString(), "update-chat", {
                    id: chatId,
                    messages: [lastMessage],
                });
            }
            catch (error) {
                console.error("Error sending pusher update:", error);
            }
        })

        return JSON.parse(JSON.stringify(newMessage));
    } catch (error) {
        handleError(error);

    }
}

export async function getMessagesByChatId(chatId: string) {
    try {
        await connectToDatabase();

        const chat = await Chat.findById(chatId)
            .populate({
                path: "messages",
                model: Message,
                populate: { path: "sender seenBy", model: "User" },
            }).exec();

        if (!chat) throw new Error("Chat not found");

        return chat.messages;
    } catch (error) {
        handleError(error);
        return [];
    }
}

type DeleteMessageProps = {
    messageId: string;
    chatId: string;
    currentUserId: string;
  };
  
  export async function deleteMessageById({
    messageId,
    chatId,
    currentUserId,
  }: DeleteMessageProps) {
    try {
      if (!messageId) {
        throw new Error("messageId is undefined");
      }
  
      if (!chatId) {
        throw new Error("chatId is undefined");
      }
  
      await connectToDatabase();
  
      // Find the message to ensure it exists and belongs to the current user
      const message = await Message.findById(messageId);
  
      if (!message) {
        throw new Error("Message not found");
      }
  
      if (message.sender.toString() !== currentUserId) {
        throw new Error("You are not authorized to delete this message");
      }
  
      // Remove the message from the chat
      await Chat.findByIdAndUpdate(chatId, {
        $pull: { messages: messageId },
      });
  
      // Delete the message from the database
      await Message.findByIdAndDelete(messageId);
  
      // Trigger a Pusher event to notify chat members about the deleted message
      await pusherServer.trigger(chatId, "message-deleted", {
        messageId,
      });
  
      return { success: true, message: "Message deleted successfully" };
    } catch (error) {
      handleError(error);
    }
  }
