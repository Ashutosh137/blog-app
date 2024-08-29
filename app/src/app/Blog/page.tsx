// "use client";
import { axiosInstance } from "@/Axios/config";
import BlogsGroup from "@/Layout/Components/BlogsGroup";

export const revalidate = 5
export default async function Page() {
    const response = await axiosInstance("/blog")
    const { BlogPost } = response.data

    return <BlogsGroup BlogPost={BlogPost} />
}