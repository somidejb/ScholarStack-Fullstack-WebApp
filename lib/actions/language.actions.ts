"use server"

import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database";
import Language from "../mongodb/database/models/language.model";

export async function getAllLanguages(){
    try {
        await connectToDatabase();

        const languages = await Language.find();

        return JSON.parse(JSON.stringify(languages));
    } catch (error) {
        handleError(error)
    }
}

export async function getLanguageById(languageId: string){
    try {
        await connectToDatabase();

        const language = await Language.findById(languageId);

        if(!language) throw new Error("Language not found");
        return JSON.parse(JSON.stringify(language));
    }
    catch (error){
        handleError(error);
    }
}
