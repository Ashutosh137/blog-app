"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogContainer from "@/Layout/Components/BlogContainer";
import CommentSection from "@/Layout/Components/CommentSection";
import { AppDispatch, RootState } from "@/Redux/store";
import { notFound } from "next/navigation";
import Loading from "@/UI/loading";
import { fetchBlogById } from "@/Redux/Blogslice/Blogslice";
import NotFound from "@/app/not-found";

export default function Page({ params }: { params: { _id: string } }) {
    const dispatch = useDispatch<AppDispatch>();
    const { blog, status } = useSelector((state: RootState) => state.blog);

    useEffect(() => {
        dispatch(fetchBlogById(params._id));
    }, [dispatch, params._id]);

console.log(status)
    if (status === "failed") {
        notFound()
    }


    return (
        <>
            {status === "loading" || status === "idle" ? <Loading /> : blog ? <> <BlogContainer blog={blog} />
                <CommentSection blogId={blog._id} /></> : <NotFound />
            }
        </>
    );
}
