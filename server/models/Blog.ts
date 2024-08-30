import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema({
  postedby: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  tags: { type: [String], default: [] },
  title: { type: String, required: true },
  likes: { type: [Schema.Types.ObjectId], ref: "User", default: [] }, 
});

BlogSchema.index({ postedby: 1 }, { unique: false });

const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;