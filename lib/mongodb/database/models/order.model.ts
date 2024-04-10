import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const OrderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  seller: {
    type: Schema.Types.ObjectId, // Reference to a User schema
    ref: "User",
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId, // Reference to a User schema
    ref: "User",
    required: true,
  },
  book: {
    type: Schema.Types.ObjectId, // Reference to a Book schema
    ref: "book",
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
