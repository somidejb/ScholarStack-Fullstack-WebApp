"use server"

import { CreateChatParams } from "@/types"
import { connectToDatabase } from "../mongodb/database"
import Chat from "../mongodb/database/models/chat.model"
import { handleError } from "../utils"
import User from "../mongodb/database/models/user.model"


export async function getChat({userId, members} : CreateChatParams){
    try{
        await connectToDatabase()
        const query = {members: {$all : [userId, ...members], $size: 2}}

        let chat = await Chat.findOne(query);

        if(!chat){
            chat = await Chat.create({members: [userId, ...members]});
            await chat.save();

            await User.findByIdAndUpdate(userId, {$addToSet: {chats: chat._id}}, {new: true});
        };
        return JSON.parse(JSON.stringify(chat));
    }
    catch(error){
        handleError(error);
    }
}