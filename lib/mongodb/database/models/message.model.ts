import { Schema, model, models } from "mongoose";
import Document from "next/document";
import { send } from "process";


export interface IChat extends Document {
    members: Schema.Types.ObjectId[];
    messages: Schema.Types.ObjectId[];
    createdAt: Date;
    lastMessageAt: Date;
}
const MessageSchema = new Schema({
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Message = models.Message || model('Message', MessageSchema);

export default Message;
