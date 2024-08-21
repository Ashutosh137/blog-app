"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { axiosInstance } from "@/Axios/config";

interface CommentState {
  comments: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  status: "idle",
  error: null,
};

// Fetch comments for a specific blog post
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (blogId: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`comment/${blogId}`, {});
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const DeleteComment = createAsyncThunk(
  "Comments/DeleteComment",
  async (_id: any, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.userdata.token;

    try {
      const response = await axiosInstance.delete(`comment/delete/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create comment
export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ blogId, comment }: { blogId: string; comment: any }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { _id, token } = state.auth.userdata;

    try {
      const response = await axiosInstance.post(
        `comment/create`,
        { content: comment, BlogPost: blogId, postedBy: _id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
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
