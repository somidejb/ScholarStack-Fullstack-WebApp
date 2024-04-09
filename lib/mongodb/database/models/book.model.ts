import mongoose from "mongoose";

const { Schema } = mongoose;

const BookSchema = new Schema({
  bookId: {
    type: String,
    required: true,
    unique: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    require: true,
  },
  isBookFree: {
    type: Boolean,
  },
  bookDescription: {
    type: String
  },
  postedAt: {
    type: Date
  },
  imageURl: {
    type: Image
  },
  category: {
    type: String
  },
  bookOwner:{
    type:String
  }
});

const Book = mongoose.models.Book || mongoose.model("book", BookSchema);
export default Book;
