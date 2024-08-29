import React from "react"
import { axiosInstance } from "@/Axios/config";
import BlogContainer from "@/Layout/Components/BlogContainer";
import { notFound } from "next/navigation";
import CommentSection from "@/Layout/Components/CommentSection";
export const revalidate = 10
export default async function Page({ params }: { params: { id: string } }) {
    try {
        const response = await axiosInstance(`/blog/${params.id}`)
        const { blogPost } = response.data

        if (!!blogPost.length) {
            notFound()
        }
        return (
            <>
                <BlogContainer blog={blogPost} />
                <CommentSection blogId={blogPost._id} />
            </>
        )
    }
    catch (error) {
        console.log(error)
        notFound()
    }
}
