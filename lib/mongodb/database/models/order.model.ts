import mongoose, { Document, Schema, model, models } from "mongoose";

export interface IOrder extends Document {
  order: string;
  seller: mongoose.Types.ObjectId;
  buyer: mongoose.Types.ObjectId;
  book: mongoose.Types.ObjectId;
  price: string;
  orderDate: Date;
}

const OrderSchema = new Schema({
  order: {
    type: String,
    required: true,
    unique: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book: {
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

export default Order;
