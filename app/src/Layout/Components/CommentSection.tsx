"use client";
import React, { useEffect, useState } from 'react';
import Button from '@/UI/button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/Redux/store';
import { Comment, createComment, fetchComments } from '@/lib/Redux/Commentslice/commentslice';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';
import Comments from '../UI/Comments';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import("react-quill"))

interface CommentSectionProps {
    blogId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ blogId }) => {
    const [newComment, setNewComment] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const { isLogin } = useSelector((state: RootState) => state.auth);
    const { comments } = useSelector((state: RootState) => state.comment);

    useEffect(() => {
        dispatch(fetchComments(blogId))
    }, [dispatch, blogId])

    const handleAddComment = () => {
        if (newComment.trim()) {
            if (isLogin) {
                dispatch(createComment({ blogId, content: newComment.trim() }));
                setNewComment("");
            } else {
                toast.error("Please Login Again")
            }
        }
    };

    const handleChange = (e: string) => {
        setNewComment(e);
    };

    return (
        <section className="bg-[#1e293b]  mx-auto text-gray-200 p-8 mb-5 sm:mb-10  border border-gray-700">
            <h2 className="text-3xl font-extrabold mb-6 text-primary border-b-4 border-primary pb-2">
                Comments
            </h2>

            <div className="mb-8">
                <ReactQuill
                    value={newComment}
                    onChange={handleChange}
                    className="mb-4 border border-gray-600 rounded-lg shadow-md"
                />
                <Button
                    label="Add Comment"
                    type="button"
                    onClick={handleAddComment}
                />
            </div>

            <ul>
                {comments.length === 0 ? (
                    <p className="text-gray-400 text-center">No comments yet.</p>
                ) : (
                    comments.map((comment) => (
                        <Comments comment={comment} key={comment._id} />
                    ))
                )}
            </ul>
        </section>
    );
};

export default CommentSection;
