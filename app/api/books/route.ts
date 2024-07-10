import { connectToDatabase } from '@/lib/mongodb/database';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Connecting to database...');
    const conn = await connectToDatabase();
    console.log('Connection object:', conn);

    console.log('Connected to database');
    const Book = conn.model('Book');
    if (!Book) {
      throw new Error('Book model is not defined');
    }

    const books = await Book.find({}).lean();
    console.log('Books fetched from database:', books);

    return NextResponse.json(books);
  } catch (e) {
    console.error('Error fetching books:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}