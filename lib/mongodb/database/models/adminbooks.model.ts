import { Document, Schema, model, models } from "mongoose";

export interface IAdminBooks extends Document {
  description: string;
  _id: string;
  title: string;
  author: string;
  bookDescription: string;
  postedAt: Date;
  imageURLs: string[];
  category: {_id: string, name: string};
  language: {_id: string, name: string};
  isBookFree: boolean;
  price?: string;
  salePrice?: string;
  location: string;
  bookOwner: {
    clerkUserId: string;_id: string, firstName: string, lastName:string, photo: string
};
  isFavorite?: boolean;
}

const AdminBooksSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  imageURLs: {
    type: [String],
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  language: {
    type: Schema.Types.ObjectId,
    ref: 'Language',
    required: true,
  },
  isBookFree: {
    type: Boolean,
    default: false,
  },
  price: {
    type: String,
    default: '0.00'
  },
  salePrice: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  bookOwner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const AdminBooks = models.AdminBooks || model("AdminBooks", AdminBooksSchema);

export default AdminBooks;
