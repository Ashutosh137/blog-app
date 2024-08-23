"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { axiosInstance } from "@/Axios/config";
import toast from "react-hot-toast";

const API_URL = "http://localhost:4000/blog";
export interface Blog {
  _id: string;
  content: string;
  title: string;
  created_at: string;
  tags: string[];
  postedby: string;
}

interface BlogState {
  blog: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BlogState = {
  blog: null,
  status: "idle",
  error: null,
};

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (newBlog: any, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.userdata.token;
    const postedby = state.auth.userdata._id;
    console.log("blog created");
    console.log(postedby, state.auth);

    try {
      const response = await axios.post(
        `${API_URL}/createBlog`,
        {
          postedby: postedby,
          ...newBlog,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const EditBlog = createAsyncThunk(
  "blogs/EditBlog",
  async (Blog: any, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.userdata.token;
    console.log("blog edited");
    console.log(state.auth);

    try {
      const response = await axiosInstance.put(
        `blog/update/${Blog._id}`,
        {
          content: Blog.content,
          title: Blog.title,
          tags: Blog.tags,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Blog Edited Succesfullly");
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error("Error on Creating Blog");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const tags = createAsyncThunk(
  "blogs/tags",
  async (tag: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`blog/tag/${tag}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const DeleteBlog = createAsyncThunk(
  "blogs/DeleteBlog",
  async (_id: any, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.userdata.token;

    try {
      const response = await axiosInstance.delete(`blog/delete/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Dlog Deleted ")
      return response.data;
    } catch (error: any) {
      console.log(error);
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
      .addCase(createBlog.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default blogSlice.reducer;
