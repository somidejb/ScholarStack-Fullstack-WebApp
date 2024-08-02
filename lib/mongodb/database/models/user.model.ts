import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  bio?: string;
  location?: string;
  photo: string;
  favorites: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  location: {
    type: String,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  photo: {
    type: String,
    required: true,
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
  chats: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
      default: [],
    }
  ]
});

const User = models.User || model("User", UserSchema);

export default User;