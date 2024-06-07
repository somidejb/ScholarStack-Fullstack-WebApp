"use client"
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { bookFormSchema } from '@/lib/validator'
import { bookDefaultValues } from '@/constants'
import { Textarea } from '../ui/textarea'
import FileUploader from './FileUploader'
import CategoryDropdown from './CategoryDropdown'
import LanguageDropdown from './LanguageDropdown'
import { Checkbox } from '../ui/checkbox'
import { useRouter } from 'next/navigation'
import { useUploadThing } from '@/lib/uploadthing'
import { createBook, updateBook } from '@/lib/actions/book.actions'
import { IBook } from '@/lib/mongodb/database/models/book.model'


type BookFormProps = {
    userId: string;
    type: "Upload" | "Edit" ;
    book?: IBook;
    bookId?: string;
}

const BookForm = ({userId, type, book, bookId} : BookFormProps) => {
    const [isFree, setIsFree] = useState(false);

    const handleCheckboxChange = (checked: boolean) => {
        setIsFree(checked);
        form.setValue('isFree', checked);
      };
    const [files, setFiles] = useState<File[]>([]);
    const initialValues = book && type === 'Edit' 
    ? {...book}
    : bookDefaultValues;
  const router = useRouter();
  const {startUpload} = useUploadThing('imageUploader')

    const form = useForm<z.infer<typeof bookFormSchema>>({
        resolver: zodResolver(bookFormSchema),
        defaultValues: initialValues
    })
    async function onSubmit(values: z.infer<typeof bookFormSchema>) {
        let uploadedImageURLs: string[] ;
    
        if (files.length > 0) {
            const uploadedImages = await startUpload(files);
    
            if (!uploadedImages || uploadedImages.length === 0) {
                return;
            }
    
            uploadedImageURLs = uploadedImages.map(image => image.url);
        } else {
            if (values.imageURLs.length === 0) {
                return; // or handle the case where no image URL is provided
            }
    
            uploadedImageURLs = values.imageURLs;
        }
    
        if (!uploadedImageURLs) {
            return; // Ensure uploadedimageURLs is assigned before proceeding
        }
    
        if (type === 'Upload') {
            try {
                const newBook = await createBook({
                    userId,
                    book: { ...values, imageURLs: uploadedImageURLs, postedAt: new Date() },
                    path: '/profile'
                });
    
                if (newBook) {
                    form.reset();
                    router.push(`/books/${newBook._id}`);
                }
            } catch (error) {
                console.log(error);
            }
        }
    
        if (type === 'Edit') {
            if (!bookId) {
                router.back();
                return;
            }
            try {
                const updatedBook = await updateBook({
                    userId,
                    book: { ...values, imageURLs: uploadedImageURLs, _id: bookId , postedAt: new Date()},
                    path: `/books/${bookId}`
                });
    
                if (updatedBook) {
                    form.reset();
                    router.push(`/books/${updatedBook._id}`);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    
  return (
    <section className = "form-shadow mx-[11px] lg:mx-[150px] rounded-[40px] mb-[50px]">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center p-[35px] lg:px-[70px]">
            <div className = "field-div">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem className = "w-full">
                        <FormLabel className="input-label">*Book Title</FormLabel>
                        <FormControl>
                            <Input {...field} className = "input-field"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                    <FormItem className = "w-full">
                        <FormLabel className="input-label">*Book Author</FormLabel>
                        <FormControl>
                            <Input {...field} className = "input-field"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <div className = "field-div">
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem className = "w-full">
                        <FormLabel className="input-label">*Book Description</FormLabel>
                        <FormControl className = "h-[250px]">
                            <Textarea {...field} className = "textarea"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="imageURLs"
                render={({ field }) => (
                    <FormItem className = "w-full">
                        <FormLabel className="input-label">*Upload Picture</FormLabel>
                            <FormControl className="h-[250px]">
                                <FileUploader
                                    onFieldChange = {field.onChange}
                                    imageURLs = {field.value || []}
                                    setFiles = {setFiles}
                                />
                            </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <div className = "field-div">
                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem className = "w-full">
                            <FormLabel className = "input-label">*Category</FormLabel>
                                <FormControl>
                                    <CategoryDropdown onChangeHandler={field.onChange} value={field.value} />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="languageId"
                    render={({ field }) => (
                        <FormItem className = "w-full">
                            <FormLabel className = "input-label">*Language</FormLabel>
                                <FormControl>
                                    <LanguageDropdown onChangeHandler={field.onChange} value={field.value} />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="field-div mb-5">
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel className={`input-label ${isFree ? 'invisible' : ''}`}>*Price</FormLabel>
                        <FormControl>
                        <div className="flex-center w-full rounded-full">
                            <Input
                            type="number"
                            placeholder="$"
                            {...field}
                            className={`input-field outline-offset-0 ${isFree ? 'invisible' : ''}`}
                            />
                            <FormField
                            control={form.control}
                            name="isFree"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <div className="flex items-center">
                                    <label
                                        htmlFor="isFree"
                                        className="whitespace-nowrap pl-1 pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 input-label"
                                    >
                                        Free Book
                                    </label>
                                    <Checkbox
                                        onCheckedChange={(checked) => handleCheckboxChange(checked as boolean)}
                                        checked={field.value}
                                        id="isFree"
                                        className="mr-2 h-5 w-5 border-2 border-primary-500"
                                    />
                                    </div>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="salePrice"
                    render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel className={`input-label ${isFree ? 'invisible' : ''}`}>Sale Price</FormLabel>
                        <FormControl>
                        <Input
                            type="number"
                            placeholder="$"
                            {...field}
                            className={`input-field outline-offset-0 ${isFree ? 'invisible' : ''}`}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
            <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                    <FormItem className = "w-full">
                        <FormLabel className="input-label">*Location</FormLabel>
                        <FormControl>
                            <Input {...field} 
                            className = "input-field"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
            />
            <Button 
                type="submit" 
                disabled={form.formState.isSubmitting}
                className="mt-10 w-full h-[50px] bg-[#31457B] text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            >
                {form.formState.isSubmitting ? 'Submitting...' : `${type} Book`}
            </Button>
        </form>
        </Form>
        <p className = "flex-center"> Marked with * are important</p>
    </section>
  )
}

export default BookForm
