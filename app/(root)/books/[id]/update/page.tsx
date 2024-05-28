// pages/update-book.tsx
 
import React from 'react';
 
const UpdateBook = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">*Book Title</label>
            <input type="text" id="title" name="title" placeholder="Prisoner" className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">*Book Author</label>
            <input type="text" id="author" name="author" placeholder="David" className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Book Description</label>
          <textarea id="description" name="description" placeholder="A compilation of poetry" className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
        </div>
        <div>
          <label htmlFor="picture" className="block text-sm font-medium text-gray-700">*Upload picture</label>
          <input type="file" id="picture" name="picture" accept=".png, .jpeg, .svg" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">*Category</label>
            <input type="text" id="category" name="category" placeholder="Poetry" className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">*Price</label>
            <input type="text" id="price" name="price" placeholder="$15" className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="marketPrice" className="block text-sm font-medium text-gray-700">Sales/Market price</label>
            <input type="text" id="marketPrice" name="marketPrice" className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="uploadTime" className="block text-sm font-medium text-gray-700">*Upload time</label>
            <input type="datetime-local" id="uploadTime" name="uploadTime" defaultValue="2024-05-22T12:00" className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
          </div>
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">*Add location</label>
          <input type="text" id="location" name="location" placeholder="Saddletown" className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
        </div>
        <div className="flex items-start">
          <input type="checkbox" id="freeBook" name="freeBook" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
          <label htmlFor="freeBook" className="ml-2 block text-sm text-gray-900">Upload as free book</label>
        </div>
        <div className="flex space-x-4">
          <button type="submit" className="inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Submit</button>
          </div>
         <div>
           <button type="button" className="inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-900 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</button>
        </div>
      </form>
    </div>
  );
};
 
export default UpdateBook;