import React from "react";
import { axiosInstance } from "@/Axios/config";
import BlogContainer from "@/Layout/UI/BlogContainer";
import { notFound } from "next/navigation";
import CommentSection from "@/Layout/Components/CommentSection";
import Head from "next/head";
export const revalidate = 10;
export default async function Page({ params }: { params: { id: string } }) {
  try {
    const response = await axiosInstance(`/blog/${params.id}`);
    const { blogPost } = response.data;

    return (
      <>
        <Head>
          <title>{blogPost.title}</title>
          <meta name="description" content={blogPost.content} />
          <meta name="keywords" content={blogPost.tags} />
        </Head>
        <BlogContainer blog={blogPost} />
        <CommentSection blogId={blogPost._id} />
      </>
    );
  } catch (error) {
    console.log(error);
    notFound();
  }
}
