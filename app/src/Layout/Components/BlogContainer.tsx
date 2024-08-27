import React from 'react';
import Users from '../UI/User';
import Controller from '../UI/Controller';
import Tag from '../../UI/tag';
import "@/assets/blog.css";
import { Blog } from '@/Redux/Blogslice/Blogslice';
import Share from '../UI/share';

function BlogContainer({ blog }: { blog: Blog }) {
    return (
        <article className="max-w-5xl pt-10 sm:pt-16 border bg-[#1e293b] border-gray-700 shadow-sm rounded-md sm:my-5 mx-auto sm:py-12 py-5 px-2 sm:px-4">
            <div className=" rounded-lg space-y-6">
                <h1 className="text-[1.5rem] sm:text-[2.5rem] border-b-4 border-primary mx-4 sm:mx-8 pb-2  font-extrabold text-pretty text-primary mb-4">
                    {blog.title}
                </h1>

                <div className="flex flex-wrap px-4 sm:px-8  gap-3 mb-6">
                    {blog.tags?.map((tag: string, index: React.Key) => (
                        <Tag label={tag} key={index} />
                    ))}
                </div>

                <div
                    className="prose prose-invert mb-6 text-gray-200 blog-container"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                <hr className="border-gray-700" />
                <p className='text-left text-sm p-3 text-gray-200'>{new Date(blog.created_at).toLocaleDateString()}</p>

                <Share Blogid={blog._id} title={blog.title}/>
                <div className="flex justify-between items-center border rounded-md border-gray-700 text-gray-400 text-sm p-3">
                    <Users userid={blog.postedby} />
                    <Controller Blog={blog} />
                </div>
            </div>
        </article>
    );
}

export default BlogContainer;
