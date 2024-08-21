import { axiosInstance } from '@/Axios/config'
import BlogContainer from '@/Layout/Components/BlogContainer'
import CommentSection from '@/Layout/Components/CommentSection'
import { notFound } from 'next/navigation'

async function Page({ params }: { params: any }) {
    try {
        const response = await axiosInstance.get(`blog/${params._id}`)
        const res = await axiosInstance.get(`blog/${params._id}/comments`)
        const { comments } = res.data
        const { blogPost } = response.data

        if (blogPost.length === 0) { notFound() }

        return (
            <>
                <BlogContainer blog={blogPost} />
                <CommentSection comments={comments} blogId={blogPost._id} />
            </>
        )
    }
    catch (error) {
        notFound()
    }

}

export default Page