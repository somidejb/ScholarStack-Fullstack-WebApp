import mongoose from "mongoose";

const { Schema, model, models } = mongoose;


const sellerSchema = new Schema({
  sellerId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true
  },
  contactInfo: {
    email: { type: String, required: true },
    phone: String,
  },
});

const Owner = mongoose.models.Owner || mongoose.model("Seller", sellerSchema);

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
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  bookOwner: {
    type: Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
  },
});

const Book = mongoose.models.Book || mongoose.model("book", BookSchema);
export default Book;
