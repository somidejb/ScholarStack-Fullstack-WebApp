import { Schema, model, models, Document } from "mongoose";


export interface ILanguage extends Document {
    _id: string;
    name: string;
}
const LanguageSchema = new Schema({
    name: {type: String, required: true, unique: true},
});

const Language = models.Language || model('Language', LanguageSchema);

export default Language;
