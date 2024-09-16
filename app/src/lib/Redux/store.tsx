"use client";
import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./Blogslice/Blogslice";
import commentReducer from "@/lib/Redux/Commentslice/commentslice";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import authReducer from "@/lib/Redux/Authslice/Authslice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    comment: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const UseReduxprovider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Provider store={store}>
      <Toaster />
      {children}
    </Provider>
  );
};
