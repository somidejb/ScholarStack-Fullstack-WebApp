"use server"

import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database";
import Language from "../mongodb/database/models/language.model";

export const getAllLanguages = async () => {
    try {
        await connectToDatabase();

        const languages = await Language.find();

        return JSON.parse(JSON.stringify(languages));
    } catch (error) {
        handleError(error)
    }
}