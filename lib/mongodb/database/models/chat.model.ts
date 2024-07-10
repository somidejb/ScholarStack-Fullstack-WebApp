import mongoose, { Schema, model, models } from "mongoose";
import Document from "next/document";


const chatSchema = new mongoose.Schema({
    members: {
        type: [{
            type:mongoose.Schema.Types.ObjectId, ref: 'User'
        }],
    },
    messages:{
        type: [{
            type:mongoose.Schema.Types.ObjectId, ref: 'message'
        }],
    },
    name:{
        type: String,
        default: ''
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    lastMessage:{
        type: Date,
        default: Date.now
    }
})

const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema)

export default Chat