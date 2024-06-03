import mongoose from "mongoose";

const { Schema, model, models } = mongoose;


const BookSchema = new Schema({
  bookName: {
    type: String,
    required: true,
    unique: true,
  },
  isBookFree: {
    type: Boolean,
    default: false,
  },
  bookDescription: {
    type: String,
  },
  postedAt: {
    type: Date,
    default: Date.now, 
  },
  imageURL: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  bookOwner: { // Assuming 'User' represents both sellers and owners
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
const Book = models.Book || model("Book", BookSchema);
