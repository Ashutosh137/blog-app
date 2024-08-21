import React from 'react';
import Users from '../UI/User';
import Controller from '../UI/Controller';
import Tag from '../../UI/tag';
import "@/assets/blog.css";
import { Blog } from '@/Redux/Blogslice/Blogslice';

function BlogContainer({ blog }: { blog: Blog }) {
    return (
        <article className="max-w-5xl mx-auto py-12 px-2 sm:px-4">
            <div className=" rounded-lg  space-y-6">
                <h1 className="text-[1.5rem] sm:text-[2.5rem] px-4 sm:px-8  font-extrabold text-pretty text-primary mb-4">
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

                <div className="flex justify-between items-center text-gray-400 text-sm p-3">
                    <Users userid={blog.postedby} />
                    <Controller Blog={blog} />
                </div>
            </div>
        </article>
    );
}

export default BlogContainer;
