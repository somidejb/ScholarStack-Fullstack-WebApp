import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const CategorySchema = new Schema({
  categoryId: { 
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true
  },

});

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
export default Category;
