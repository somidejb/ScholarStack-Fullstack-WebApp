"use server"

import { CreateChatParams } from "@/types"
import { connectToDatabase } from "../mongodb/database"
import Chat from "../mongodb/database/models/chat.model"
import { handleError } from "../utils"
import User from "../mongodb/database/models/user.model"
import Message from "../mongodb/database/models/message.model"


export async function getChats({userId, members} : CreateChatParams){
    try{
        await connectToDatabase()
        const query = {members: {$all : [userId, ...members], $size: 2}}

        let chat = await Chat.findOne(query);

        if(!chat){
            chat = await Chat.create({members: [userId, ...members]});
            await chat.save();

            const updateAllMembers = chat.members.map(async(memberId: string) => {
                await User.findByIdAndUpdate(memberId, {$addToSet: {chats: chat._id}}, {new: true});
            })
            Promise.all(updateAllMembers); 
        };
        return JSON.parse(JSON.stringify(chat));
    }
    catch(error){
        handleError(error);
    }
}

export async function getChatByChatId(chatId: string){
    try{
        await connectToDatabase();
        const chat = await Chat.findById(chatId).populate({
            path: "members",
            model: User,
        }).populate({
            path: "messages",
            model: Message,
            populate: {path: "sender seenBy", model: User},
        }).exec();

        if(!chat) throw new Error('Chat not found');
        return JSON.parse(JSON.stringify(chat));
    }
    catch(error){
        handleError(error);
    }
}

export async function addToSeenBy(chatId: string | undefined, userId: string){
    try{
        await connectToDatabase();
        await Message.updateMany(
            { chat: chatId},
            { $addToSet: {seenBy: userId}},
            { new: true}
        ).populate({
            path: "sender seenBy",
            model: User,
        }).exec();

        return new Response('Seen by added successfully', {status: 200});
    }
    catch(error){
        console.log(error);
        return new Response('Error adding seen by', {status: 500});
    }
}