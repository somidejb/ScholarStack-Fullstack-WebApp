import { connectToDatabase } from '@/lib/mongodb/database';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    const Book = conn.model('Book');
    if (!Book) {
      throw new Error('Book model is not defined');
    }

    const books = await Book.find({}).lean();

    return NextResponse.json(books);
  } catch (e) {
    console.error('Error fetching books:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}