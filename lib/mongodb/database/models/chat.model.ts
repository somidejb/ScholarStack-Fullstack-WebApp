<<<<<<< HEAD
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
=======
import { Schema, model, models } from "mongoose";
import Document from "next/document";


export interface IChat extends Document {
    _id: string;
    members: { _id: string, username: string, photo: string }[];
    messages: { _id: string, text: string, sender: { _id: string}, seenBy: {_id: string, username: string, photo: string} }[];
    createdAt: Date;
    lastMessageAt: Date;
}
const ChatSchema = new Schema({
    members: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
    },
    messages: {
        type: [Schema.Types.ObjectId],
        ref: 'Message',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastMessageAt: {
        type: Date,
        default: Date.now,
    }
});

const Chat = models.Chat || model('Chat', ChatSchema);

export default Chat;
>>>>>>> a8e014b36ce36744a80e52cb714943122a7fa7ee
