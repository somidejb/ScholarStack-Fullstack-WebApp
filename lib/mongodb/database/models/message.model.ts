import { Schema, model, models } from "mongoose";
import Document from "next/document";
import { send } from "process";


export interface IMessage extends Document {
    chat: { _id: string, members: { _id: string, username: string, photo: string }[],messages: { _id: string, text: string, sender: string }[], createdAt: Date, lastMessageAt: Date}[];
    sender: { _id: string, username: string, photo: string };
    text: string;
    createdAt: Date;
    seenBy: {_id: string, username: string, photo: string};
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
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    seenBy: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
});

const Message = models.Message || model('Message', MessageSchema);

export default Message;
