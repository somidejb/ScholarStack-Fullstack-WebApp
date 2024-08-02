'use server'

import { revalidatePath } from 'next/cache';
import { handleError } from '@/lib/utils';
import Order from '../mongodb/database/models/order.model';
import { connectToDatabase } from '../mongodb/database';
import { CreateBookParams, CreateOrderParams, DeleteOrderParams, GetAllOrdersParams, UpdateOrderParams } from '@/types';
import User from '../mongodb/database/models/user.model';
import Book from '../mongodb/database/models/book.model';
import { Query } from 'mongoose';

// Function to populate order details
const populateOrder = (query: Query<any, any, {}, any>) => {
  return query
    .populate({ path: 'seller', model: User, select: '_id firstName lastName' })
    .populate({ path: 'buyer', model: User, select: '_id firstName lastName' })
    .populate({ path: 'book', model: Book, select: '_id title' });
}

// Function to create a new book
export async function createBook({ userId, book, path }: CreateBookParams) {
  try {
    await connectToDatabase();

    const owner = await User.findById(userId);
    if (!owner) throw new Error('Book Owner not found');

    const newBook = await Book.create({
      ...book,
      category: book.categoryId,
      language: book.languageId,
      bookOwner: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newBook));
  } catch (error) {
    handleError(error);
  }
}

// Function to create a new order
export async function createOrder({ userId, order, path }: CreateOrderParams) {
  try {
    await connectToDatabase();

    const buyer = await User.findOne({ clerkId: userId });
    if (!buyer) throw new Error('Buyer not found');

    const newOrder = await Order.create({ ...order, buyer: buyer._id });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
}

// Function to get an order by its ID
export async function getOrderById(orderId: string) {
  try {
    await connectToDatabase();

    const order = await populateOrder(Order.findById(orderId));
    if (!order) throw new Error('Order not found');

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    handleError(error);
  }
}

// Function to update an order
export async function updateOrder({ userId, order, path }: UpdateOrderParams) {
  try {
    await connectToDatabase();

    const orderToUpdate = await Order.findById(order._id);
    if (!orderToUpdate || orderToUpdate.buyer.toHexString() !== userId) {
      throw new Error('Unauthorized or order not found');
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      order._id,
      { ...order },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedOrder));
  } catch (error) {
    handleError(error);
  }
}

// Function to delete an order
export async function deleteOrder({ orderId, path }: DeleteOrderParams) {
  try {
    await connectToDatabase();

    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (deletedOrder) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// Function to get all orders with pagination
export async function getAllOrders({ query, limit = 10, page = 1 }: GetAllOrdersParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const ordersQuery = Order.find(query)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit);

    const orders = await populateOrder(ordersQuery);
    const ordersCount = await Order.countDocuments(query);

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// Function to fetch all orders
export async function fetchAllOrders() {
  try {
    await connectToDatabase();

    const orders = await populateOrder(Order.find({})).lean();
    return JSON.parse(JSON.stringify(orders));
    console.log(orders);
  } catch (error) {
    handleError(error);
    return [];
  }
}

// Function to fetch an order by its ID
export const fetchOrderById = async (id: string) => {
  try {
    await connectToDatabase();
    const order = await populateOrder(Order.findById(id)).lean();
    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    handleError(error);
    return null;
  }
}

// Function to fetch orders by book ID
export async function fetchOrdersByBook(bookId: string) {
  try {
    await connectToDatabase();
    const orders = await populateOrder(Order.find({ book: bookId }));
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    handleError(error);
    return [];
  }
}
