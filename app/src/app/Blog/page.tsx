"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogsGroup from "@/Layout/Components/BlogsGroup";
import Loading from "@/UI/loading";
import { AppDispatch, RootState } from "@/Redux/store";
import { fetchAllBlogs } from "@/Redux/Blogslice/Blogslice";
import { notFound } from "next/navigation";

export default function Page() {
    const dispatch = useDispatch<AppDispatch>();
    const { blogs, status } = useSelector((state: RootState) => state.blog);

    useEffect(() => {
        dispatch(fetchAllBlogs());
    }, [dispatch]);

    if (status === "loading" || status === "idle") {
        return <Loading />;
    }

    if (status === "failed") {
        notFound()
    }

    return (
        <div className="p-6 min-h-screen">
            <BlogsGroup BlogPost={blogs} />
        </div>
    );
}
