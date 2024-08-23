import { axiosInstance } from '@/Axios/config'
import BlogsGroup from '@/Layout/Components/BlogsGroup'
import Users from '@/Layout/UI/User'
import Heading from '@/UI/heading'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
    title: "profile || blogup",
    description: "Profile",
};
async function Page({ params }: { params: any }) {
    const response = await axiosInstance.get(`auth/profile/${params.id}/blogs`)
    const { blogPost } = response.data

    return <div className='max-w-5xl mx-auto flex flex-col gap-5'>
        <Heading label='profile' />
        <Users userid={params.id} />
        <BlogsGroup BlogPost={blogPost} />
    </div>

}

export default Page