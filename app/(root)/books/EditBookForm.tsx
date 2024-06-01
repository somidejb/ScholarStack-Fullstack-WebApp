"use client";
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FiChevronDown, FiMapPin, FiCloud, FiDownload } from 'react-icons/fi';

  const EditBookForm = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            setSelectedFiles(Array.from(files));
        } else {
            setSelectedFiles([]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="max-w-md w-full space-y-8 md:max-w-xl lg:max-w-2xl xl:max-w-3xl rounded-xl">
                <form className="bg-white p-6 lg:p-10 xl:p-15 rounded-lg shadow-lg shadow-indigo-100 space-y-6">
                    <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">
                        Edit Book
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                * Book Title
                            </label>
                            <input
                                className="mt-1 block w-full px-3 py-2 bg-indigo-50 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                type="text"
                                placeholder="Book Title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                * Book Author
                            </label>
                            <input
                                className="mt-1 block w-full px-3 py-2 bg-indigo-50 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                type="text"
                                placeholder="Book Author"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Book Description
                            </label>
                            <textarea
                                className="mt-1 block w-full px-3 py-3 bg-indigo-50 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                placeholder="Book Description"
                            ></textarea>
                        </div>

                        <div>
                        <label htmlFor="picture" className="block text-sm font-medium text-gray-700">
                            *Upload picture
                        </label>
                        <div className="relative mt-1 flex items-center">
                            <input
                                type="file"
                                id="picture"
                                name="picture"
                                accept=".png, .jpeg, .svg"
                                className="block w-full h-28 px-3 py-3 text-sm text-gray-500 bg-indigo-50 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                                multiple  // Allow multiple file uploads
                                onChange={handleFileChange}
                            />
                            <FiCloud className="absolute right-3 -mt-1 top-8 transform -translate-y-1/2 text-gray-500 fill-slate-400" size={24} />
                        </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            * Category
                        </label>
                        <div>
                            <Select>
                                <SelectTrigger className="bg-indigo-50 focus-visible:ring-0 focus-visible:ring-transparent">
                                    <div className="flex items-center text-gray-400">
                                        <SelectValue placeholder="select category" />
                                        <FiChevronDown className="ml-2" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="biology">Biology</SelectItem>
                                    <SelectItem value="Math">Math</SelectItem>
                                    <SelectItem value="physics">Physics</SelectItem>
                                    <SelectItem value="fiction">Fiction</SelectItem>
                                    <SelectItem value="non-fiction">Non-fiction</SelectItem>
                                    <SelectItem value="art & Music">Art & Music</SelectItem>
                                    <SelectItem value="health & Yoga">Health & Yoga</SelectItem>
                                    <SelectItem value="sports">Sports</SelectItem>
                                    <SelectItem value="literature">Literature</SelectItem>
                                    <SelectItem value="children's book">Children's book</SelectItem>
                                    <SelectItem value="history">History</SelectItem> 
                                    <SelectItem value="chemistry">Chemistry</SelectItem>
                                    <SelectItem value="engineering">Engineering</SelectItem>
                                    <SelectItem value="computers & tech">Computers & tech</SelectItem>
                                    <SelectItem value="architecture">Architecture</SelectItem>
                                    <SelectItem value="novel">Novel</SelectItem>
                                    <SelectItem value="poetry">Poetry</SelectItem>
                                    <SelectItem value="mystery">Mystery</SelectItem>
                                    <SelectItem value="sci-fi">Sci-fi</SelectItem>
                                    <SelectItem value="crime fiction">Crime fiction</SelectItem>
                                    <SelectItem value="biography and Autobiography">Biography and Autobiography</SelectItem>
                                    <SelectItem value="philosophy">Philosophy</SelectItem>
                                    <SelectItem value="mythology">Mythology</SelectItem>
                                    <SelectItem value="essay">Essay</SelectItem>
                                    <SelectItem value="short Story">Short Story</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                * Price
                            </label>
                            <input
                                className="mt-1 block w-full px-3 py-2 bg-indigo-50 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                type="text"
                                placeholder="Price"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Sales/Market price
                            </label>
                            <input
                                className="mt-1 block w-full px-3 py-2 bg-indigo-50 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                type="text"
                                placeholder="Sales/Market price"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                * Upload time
                            </label>
                            <input
                                className="mt-1 block w-full px-3 py-2 bg-indigo-50 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                type="datetime-local"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                * Add location
                            </label>
                            <div className="relative mt-1">
                                <input
                                    className="block w-full px-3 py-2 bg-indigo-50 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                    type="text"
                                    placeholder="Add location"
                                />
                                <FiMapPin className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm font-medium text-gray-700">
                            Upload as free book
                        </label>
                    </div>

                    <div>
                        <button
                            className="w-full bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                    <div>
                        <button type="button" className="inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Delete
                        </button>
                    </div>

                    <p className="text-center text-gray-500 text-xs mt-4">
                        Marked with * are important
                    </p>
                </form>
            </div>
        </div>
    );
}

export default EditBookForm;
