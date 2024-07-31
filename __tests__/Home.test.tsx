// __tests__/Home.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/(root)/page';
import { fetchAllBooks } from '@/lib/actions/book.actions';
import { auth } from '@clerk/nextjs/server';
import { IBook } from '@/lib/mongodb/database/models/book.model';

// Mock fetchAllBooks function

// Mock fetchAllBooks function
jest.mock('@/lib/actions/book.actions', () => ({
    fetchAllBooks: jest.fn(),
  }));
  
  // Mock auth function
  jest.mock('@clerk/nextjs/server', () => ({
    auth: jest.fn(),
  }));
  
  jest.mock('@/lib/actions/book.actions');
  jest.mock('@clerk/nextjs/server');
  
  const mockBooks = [
    { title: 'Book 1', postedAt: new Date().toISOString(), salePrice: '', isBookFree: false },
    { title: 'Book 2', postedAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString(), salePrice: '10', isBookFree: false },
    { title: 'Book 3', postedAt: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString(), salePrice: '', isBookFree: true },
  ];
  
  describe('Home Page', () => {
    beforeEach(() => {
      (fetchAllBooks as jest.Mock).mockResolvedValue(mockBooks);
      (auth as jest.Mock).mockReturnValue({ sessionClaims: { userId: '123' } });
    });
  
    it('renders the Banner component', async () => {
      render(await Home());
      expect(screen.getByText(/banner content/i)).toBeInTheDocument();
    });
  
    it('renders the Collection components', async () => {
      render(await Home());
      expect(screen.getByText(/Recently Uploaded/i)).toBeInTheDocument();
      expect(screen.getByText(/Books on Sale/i)).toBeInTheDocument();
      expect(screen.getByText(/Free Books/i)).toBeInTheDocument();
    });
  
    it('calls fetchAllBooks and categorizes books correctly', async () => {
      render(await Home());
      await (() => {
        expect(fetchAllBooks).toHaveBeenCalledTimes(1);
      });
  
      const recentlyUploaded = screen.getByText(/Recently Uploaded/i);
      const booksOnSale = screen.getByText(/Books on Sale/i);
      const freeBooks = screen.getByText(/Free Books/i);
  
      expect(recentlyUploaded).toBeInTheDocument();
      expect(booksOnSale).toBeInTheDocument();
      expect(freeBooks).toBeInTheDocument();
  
      // Ensure the books are categorized correctly
      expect(screen.getByText(/Book 2/i)).toBeInTheDocument(); // Recently Uploaded and On Sale
      expect(screen.getByText(/Book 3/i)).toBeInTheDocument(); // Free Books
    });
  
    it('passes userId to Collection components', async () => {
      render(await Home());
      const userId = '123';
      expect(auth).toHaveBeenCalledTimes(1);
  
      const collectionElements = screen.getAllByTestId('collection');
      collectionElements.forEach((element) => {
        expect(element).toHaveAttribute('data-user-id', userId);
      });
    });
  });