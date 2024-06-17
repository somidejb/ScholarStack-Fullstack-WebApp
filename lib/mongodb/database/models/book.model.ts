import { Document, Schema, model, models } from "mongoose";

export interface IBook extends Document {
  description: ReactNode;
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
  bookOwner: {_id: string, firstName: string, lastName:string, photo: string};
  isFavorite?: boolean;
}

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
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

const Book = models.Book || model("Book", BookSchema);

export default Book;
