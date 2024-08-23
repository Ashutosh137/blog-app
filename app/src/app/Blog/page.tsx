import { axiosInstance } from '@/Axios/config'
import BlogsGroup from '@/Layout/Components/BlogsGroup'
import Heading from '@/UI/heading'
import React from 'react'

async function Page() {
    const response = await axiosInstance.get("/blog")
    const { BlogPost } = response.data
    return (
        <div className="p-6 min-h-screen">
            <Heading label="All Blogs" />
            <BlogsGroup BlogPost={BlogPost} />
        </div>
    )


}

export default Page