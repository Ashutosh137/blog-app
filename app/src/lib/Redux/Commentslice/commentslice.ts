"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { axiosInstance } from "@/Axios/config";
import toast from "react-hot-toast";

interface CommentState {
  comments: Comment[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface Comment {
  _id: string;
  text: string;
  postedby: string;
  BlogPost: string;
  created_at: string;
  likes: string[];
}

const initialState: CommentState = {
  comments: [],
  status: "idle",
  error: null,
};

export const fetchComments = createAsyncThunk<
  Comment[],
  string,
  { state: RootState }
>("comments/fetchComments", async (blogId, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`/blog/${blogId}/comments`);
    return response.data.comments;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteComment = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("comments/deleteComment", async (commentId, thunkAPI) => {
  const { token } = thunkAPI.getState().auth.userdata;

  try {
    await axiosInstance.delete(`/comment/delete/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Comment deleted successfully");
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createComment = createAsyncThunk<
  Comment,
  { blogId: string; content: string },
  { state: RootState }
>("comments/createComment", async ({ blogId, content }, thunkAPI) => {
  const { _id, token } = thunkAPI.getState().auth.userdata;

  try {
    const response = await axiosInstance.post(
      `/comment/create`,
      { content, BlogPost: blogId, postedBy: _id },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    toast.success("Comment added successfully");
    return response.data.comment;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const LikeComment = createAsyncThunk<any, string>(
  "blogs/Like",
  async (commentId, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { token, _id } = state.auth.userdata;

    try {
      const response = await axiosInstance.put(
        `comment/like/${commentId}`,
        { likedBy: _id },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(createComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default commentSlice.reducer;
