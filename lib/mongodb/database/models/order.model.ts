import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  sellerId: {
    type: String,
    required: true,
    unique: true,
  },
  buyerId: {
    type: String,
    required: true,
    unique: true,
  },
  bookId: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    require: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
