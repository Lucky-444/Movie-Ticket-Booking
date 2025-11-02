import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
});

// ✅ Use the model name as a string, not a variable
const User = mongoose.model("User", UserSchema);

export default User;
