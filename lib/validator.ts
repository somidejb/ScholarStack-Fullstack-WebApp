import { z } from "zod";

export const bookFormSchema = z.object({
    title: z.string().min(3, 'Book title must be at least 3 characters.').max(50, 'Book title must be less than 50 characters.'),
    author: z.string().min(3, 'Book Author must be at least 3 characters.').max(50, 'Book Author must be less than 50 characters.'),
    description: z.string().min(3, 'Description must be at least 3 characters.').max(400, 'Description must be less than 400 characters.'),
    imageURLs: z.string().array().min(2, 'At least twos images must be uploaded.').max(4, 'Maximum of 4 images can be uploaded.'),
    categoryId: z.string().min(3, 'Category must be selected.'),
    languageId: z.string().min(3, 'Language must be selected.'),
    isBookFree: z.boolean().optional(),
    price: z.string().optional().refine((value) => {
        if (!value) return true; // Allow empty price if the field is optional
        const price = parseFloat(value);
        return !isNaN(price) && price >= 0; // Allow price to be zero or positive
    }, {
        message: 'Price must be a valid non-negative number',
    }),
    salePrice: z.string().optional(),
    location: z.string().min(3, 'Location must be at least 3 characters.').max(50, 'Location must be less than 50 characters.'),
}).superRefine((data, ctx) => {
    if (data.salePrice) {
        const salePrice = parseFloat(data.salePrice);
        const price = parseFloat(data.price || '0');
        if (isNaN(salePrice) || salePrice <= 0 || salePrice > price) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Sale price must be a valid positive number less than or equal to the price',
                path: ['salePrice'],
            });
        }
    }
});
