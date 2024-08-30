import React from 'react';
import { axiosInstance } from '@/Axios/config';
import { notFound } from 'next/navigation';
import Users from '@/Layout/UI/User';
import BlogsGroup from '@/Layout/Components/BlogsGroup';
import Head from 'next/head';

export const revalidate = 10

export default async function Page({ params }: { params: { id: string } }) {
    try {

        const response = await axiosInstance(`/auth/profile/${params.id}`)
        const Blogresponse = await axiosInstance(`/auth/profile/${params.id}/blogs`)
        const { user } = response.data
        const { blogPost } = Blogresponse.data

        return <div className='mx-auto max-w-4xl flex flex-col space-y-5'>
            <Head>
                <title>{user.name}</title>
                <meta name="description" content={user.bio} />
            </Head>
            <Users user={user} />
            <BlogsGroup BlogPost={blogPost} />
        </div>
    }
    catch (error) {
        console.log(error)
        notFound()
    }
}
