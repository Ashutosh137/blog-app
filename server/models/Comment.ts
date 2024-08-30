import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
  postedby: { type: Schema.Types.ObjectId, ref: "User", required: true },
  BlogPost: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
  text: { type: String, required: true },
  created_at: { type: Date, default: new Date() },
  likes: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
});

const CommentBlog = mongoose.model("CommentBlog", UserSchema);
UserSchema.index({ BlogPost: 1 }, { unique: false });

export default CommentBlog;
