"use server"

import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database";
import Category from "../mongodb/database/models/category.model";

export const getAllCategories = async () => {
    try {
        await connectToDatabase();

        const categories = await Category.find();

        return JSON.parse(JSON.stringify(categories));
    } catch (error) {
        handleError(error)
    }
}