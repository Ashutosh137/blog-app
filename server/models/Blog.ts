import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
  postedby: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: new Date() },
  tags: { type: Array },
  title: { type: String, required: true },
});
const Blog = mongoose.model("Blog", UserSchema);
UserSchema.index({ postedby: 1 }, { unique: false });

export default Blog;
