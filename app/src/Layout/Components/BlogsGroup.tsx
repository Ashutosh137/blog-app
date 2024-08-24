import React, { Key } from 'react';
import BlogContainerMask from '../UI/BlogContainerMask';
import BlogContainer from './BlogContainer';
import Link from 'next/link';
import { Blog } from '@/Redux/Blogslice/Blogslice';


function BlogsGroup({ BlogPost }: { BlogPost: Blog[] }) {
    if (BlogPost.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-200 mb-4">No Blog Posts Found</h2>
                <p className="text-gray-400">We couldn’t find any blog posts at the moment. Please check back later.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-8 md:space-y-12 lg:space-y-16">
            {BlogPost.map((blogpost: Blog, index: Key) => (
                <Link href={`/Blog/${blogpost._id}`} key={index} passHref>
                    <BlogContainerMask>
                        <BlogContainer blog={blogpost} />
                    </BlogContainerMask>
                </Link>
            ))}
        </div>
    );
}

export default BlogsGroup;
