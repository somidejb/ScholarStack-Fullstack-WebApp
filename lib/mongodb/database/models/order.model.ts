import mongoose from "mongoose";

const { Schema, model, models } = mongoose;
const OrderSchema = new Schema({
  order: {
    type: String,
    required: true,
    unique: true,
  },
  seller: { // Reference to 'User'
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  buyer: { // Reference to 'User'
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book: { // Reference to 'Book'
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  price: {
    type: Number,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});
const Order = models.Order || model("Order", OrderSchema);
