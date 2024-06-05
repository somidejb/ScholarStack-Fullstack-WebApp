import { z } from "zod";

export const bookFormSchema = z.object({
    title: z.string().min(3, 'Book title must be at least 3 characters.'),
    author: z.string().min(3, 'Book Author must be at least 3 characters.'),
    description: z.string().min(3, 'Description must be at least 3 characters.').max(400, 'Description must be less than 400 characters.'),
    imageURLs: z.string().array().min(1, 'At least one image must be uploaded.'),
    categoryId: z.string(),
    languageId: z.string(),
    isFree: z.boolean().optional(),
    price: z.string().refine((value) => {
        if (!value) return true; // Allow empty price if the field is optional
        const price = parseFloat(value);
        return !isNaN(price) && price > 0;
    }, {
        message: 'Price must be a valid positive number',
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
