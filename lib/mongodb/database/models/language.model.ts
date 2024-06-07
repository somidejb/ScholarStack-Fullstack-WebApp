import { Schema, model, models } from "mongoose";
import Document from "next/document";


export interface ILanguage extends Document {
    _id: string;
    name: string;
}
const LanguageSchema = new Schema({
    name: {type: String, required: true, unique: true},
});

const Language = models.Language || model('Language', LanguageSchema);

export default Language;
