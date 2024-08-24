"use client"
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '@/Axios/config';
import BlogsGroup from '@/Layout/Components/BlogsGroup';
import Users from '@/Layout/UI/User';
import Loading from '@/UI/loading';
import { notFound } from 'next/navigation';


interface Blog {
    _id: string;
    title: string;
    content: string;
    created_at: string;
    tags: string[];
    postedby: string;
}


export default function Page({ params }: { params: { id: string } }) {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogsResponse = await axiosInstance.get(`auth/profile/${params.id}/blogs`);
                setBlogs(blogsResponse.data.blogPost);
            } catch (error: any) {
                setError(error.response?.data?.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id]);

    if(error){
        notFound()
    }


    return (
        <div className='max-w-5xl mx-auto flex flex-col gap-5'>
            <Users userid={params.id} />
            {loading ? <Loading /> : <BlogsGroup BlogPost={blogs} />}
        </div>
    );
}
