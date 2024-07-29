// import { CreateBookParams } from "@/types";
// import { IBook } from "../mongodb/database/models/book.model";
// import { createBook } from "./book.actions";
// import Order, { IOrder } from "../mongodb/database/models/order.model";

// export async function createOrderForUploadedBook(book: IBook): Promise<IOrder> {
//   const order = new Order({
//     order: `ORD-${Date.now()}`, // Generate a unique order ID
//     seller: book.bookOwner._id,
//     buyer: book.bookOwner._id, // Initially, the buyer is the same as the seller (the uploader)
//     book: book._id,
//     price: book.isBookFree ? 0 : parseFloat(book.price || '0'),
//     orderDate: new Date(),
//   });

//   return await order.save();
// }

// export function calculateDueDate(orderDate: Date): Date {
//   const oneWeek = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
//   return new Date(orderDate.getTime() + oneWeek);
// }

// export async function handleBookUploadAndOrder({ userId, book, path }: CreateBookParams) {
//   const result = await createBook({ userId, book, path });
//   if (!result) {
//     throw new Error('Failed to upload book');
//   }
//   const { book: uploadedBook, uploadTimestamp } = result;
//   const order = await createOrderForUploadedBook(uploadedBook);
//   const dueDate = calculateDueDate(uploadTimestamp);



//   return {
//     uploadedBook,
//     order,
//     dueDate,
//   };
// }
'use server'

import { revalidatePath } from 'next/cache'

import { handleError } from '@/lib/utils'
import Order from '../mongodb/database/models/order.model'
import { connectToDatabase } from '../mongodb/database'
import { CreateOrderParams, DeleteOrderParams, GetAllOrdersParams, UpdateOrderParams } from '@/types'
import User from '../mongodb/database/models/user.model'
import Book from '../mongodb/database/models/book.model'
import { Query } from 'mongoose'

const populateOrder = (query: Query<any, any, {}, any>) => {
  return query
    .populate({ path: 'seller', model: User, select: '_id firstName lastName' })
    .populate({ path: 'buyer', model: User, select: '_id firstName lastName' })
    .populate({ path: 'book', model: Book, select: '_id title' });
}

export async function createOrder({ userId, order, path }: CreateOrderParams) {
  try {
    await connectToDatabase()

    const buyer = await User.findById(userId)
    if (!buyer) throw new Error('Buyer not found')

    const newOrder = await Order.create({ ...order, buyer: userId })
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newOrder))
  } catch (error) {
    handleError(error)
  }
}

export async function getOrderById(orderId: string) {
  try {
    await connectToDatabase()

    const order = await populateOrder(Order.findById(orderId))

    if (!order) throw new Error('Order not found')

    return JSON.parse(JSON.stringify(order))
  } catch (error) {
    handleError(error)
  }
}

export async function updateOrder({ userId, order, path }: UpdateOrderParams) {
  try {
    await connectToDatabase()

    const orderToUpdate = await Order.findById(order._id)
    if (!orderToUpdate || orderToUpdate.buyer.toHexString() !== userId) {
      throw new Error('Unauthorized or order not found')
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      order._id,
      { ...order },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedOrder))
  } catch (error) {
    handleError(error)
  }
}

export async function deleteOrder({ orderId, path }: DeleteOrderParams) {
  try {
    await connectToDatabase()

    const deletedOrder = await Order.findByIdAndDelete(orderId)
    if (deletedOrder) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}

export async function getAllOrders({ query, limit = 10, page = 1 }: GetAllOrdersParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const ordersQuery = Order.find(query)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const orders = await populateOrder(ordersQuery)
    const ordersCount = await Order.countDocuments(query)

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}

export async function fetchAllOrders() {
  try {
    await connectToDatabase()

    const orders = await populateOrder(Order.find({})).lean()
    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    handleError(error)
    return []
  }
}

export const fetchOrderById = async (id: string) => {
  try {
    await connectToDatabase()
    const order = await populateOrder(Order.findById(id)).lean()
    return JSON.parse(JSON.stringify(order))
  } catch (error) {
    handleError(error)
    return null
  }
}

export async function fetchOrdersByBook(bookId: string) {
  try {
    await connectToDatabase()
    const orders = await populateOrder(Order.find({ book: bookId }))
    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    handleError(error)
    return []
  }
}
