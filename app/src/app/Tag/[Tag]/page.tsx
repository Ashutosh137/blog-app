import { axiosInstance } from '@/Axios/config'
import BlogsGroup from '@/Layout/Components/BlogsGroup'
import React from 'react'

export default async function Page({ params }: { params: any }) {
    const { Tag } = params
    const response = await axiosInstance.get(`/blog/tag/${Tag}`)
    const { blogPost } = response.data
    console.log(blogPost)
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="container mx-auto p-6">
                <div className="mb-12">
                    <h2 className="text-4xl text-center font-extrabold text-gray-100 mb-4 bg-gradient-to-r from-blue-900 to-purple-600 bg-clip-text text-transparent">
                        Posts Tagged with <span className="text-blue-300">&quot;{Tag}&quot;</span>
                    </h2>
                    <p className="text-gray-400 text-center text-lg">
                        Explore the latest articles and insights related to <span className="text-blue-300">{Tag}</span>.
                    </p>
                </div>

                {blogPost.length ? (
                    <BlogsGroup BlogPost={blogPost} />
                ) : (
                    <div className="text-center py-12 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-200 mb-4">No Blog Posts Found</h2>
                        <p className="text-gray-400">We couldn’t find any blog posts related to the tag &quot;<span className="italic text-blue-300">{Tag}</span>&quot;.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
