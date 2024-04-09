import mongoose from "mongoose";


const { Schema } = mongoose;

const CategorySchema = new Schema({
  CategoryId: {
    type: String,
    required: true,
    unique: true,
  },
  Name: {
    type: String,
    required: true,
    unique: true
  },
});

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
export default Category;
