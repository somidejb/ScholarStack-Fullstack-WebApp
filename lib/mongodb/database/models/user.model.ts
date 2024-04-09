import mongoose from "mongoose";


const { Schema } = mongoose;

const UserSchema = new Schema({
  loginId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
});

const User = mongoose.models.Category || mongoose.model("Category", UserSchema);
export default User;
