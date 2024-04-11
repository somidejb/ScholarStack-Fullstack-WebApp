import { Document } from 'mongoose';
import mongoose, { Schema, model, models } from 'mongoose';


export interface ICategory extends Document {
  category: string;
  name: string;
}

const CategorySchema = new Schema<ICategory>({
  
  name: {
    type: String,
    required: true,
    unique: true
  },
});

const Category = models.Category || model('Category', CategorySchema);
export default Category;
