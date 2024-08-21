import React, { Key } from 'react'
import BlogContainerMask from '../UI/BlogContainerMask'
import BlogContainer from './BlogContainer'
import Link from 'next/link'

function BlogsGroup({ BlogPost }: { BlogPost: any[] }) {
    return (
        <div className="flex flex-col space-y-8 md:space-y-12 lg:space-y-16">
            {BlogPost.map((blogpost: any, index: Key) => (
                <Link href={`/Blog/${blogpost._id}`} key={index} passHref>
                    <BlogContainerMask>
                        <BlogContainer blog={blogpost} />
                    </BlogContainerMask>
                </Link>
            ))}
        </div>
    )
}

export default BlogsGroup