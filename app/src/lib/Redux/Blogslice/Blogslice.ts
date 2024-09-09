"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/Axios/config";
import toast from "react-hot-toast";
import { RootState } from "../store";

export interface Blog {
  _id: string;
  content: string;
  title: string;
  created_at: string;
  tags: string[];
  postedby: string;
  likes: string[];
}

interface BlogState {
  blog: Blog | null;
  blogs: Blog[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BlogState = {
  blog: null,
  blogs: [],
  status: "idle",
  error: null,
};

const getAuthToken = (state: RootState) => state.auth.userdata.token;

export const createBlog = createAsyncThunk<Blog, Partial<Blog>>(
  "blogs/createBlog",
  async (newBlog, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = getAuthToken(state);
    const postedby = state.auth.userdata._id;

    try {
      const response = await axiosInstance.post(
        `blog/createBlog`,
        { postedby, ...newBlog },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Blog created successfully");
      return response.data.blogPost;
    } catch (error: any) {
      toast.error("Error creating blog");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editBlog = createAsyncThunk<Blog, Partial<Blog>>(
  "blogs/editBlog",
  async (blog, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = getAuthToken(state);

    try {
      const response = await axiosInstance.put(`blog/${blog._id}`, blog, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Blog edited successfully");
      return response.data;
    } catch (error: any) {
      toast.error("Error editing blog");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const LikeBlog = createAsyncThunk<any, string>(
  "blogs/Like",
  async (blogId, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = getAuthToken(state);
    const { userdata } = state.auth;

    try {
      const response = await axiosInstance.put(
        `blog/like/${blogId}`,
        { likedBy: userdata._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteBlog = createAsyncThunk<void, string>(
  "blogs/deleteBlog",
  async (_id, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = getAuthToken(state);

    try {
      const response = await axiosInstance.delete(`blog/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Blog deleted successfully");
      return response.data.blogPost;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(deleteBlog.fulfilled, (state, action: any) => {
        state.status = "succeeded";
        state.blogs = state.blogs.filter(
          (blog) => blog._id !== action.payload._id
        );
      });
  },
});

export default blogSlice.reducer;
