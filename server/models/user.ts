import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String },
  token: { type: String, required: false },
  signin: { type: String, enum: ["google", "email"] },
  isAdmin: { type: Boolean, default: false },
});
const User = mongoose.model("user", UserSchema);
UserSchema.index({ email: 1 }, { unique: true });
export default User;
