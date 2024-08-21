"use client";
import React, { useEffect, useState } from 'react';

import { axiosInstance } from '@/Axios/config';
import "@/assets/comment.css"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/store';
import { DeleteComment } from '@/Redux/Commentslice/commentslice';
import { Comment } from '../Components/CommentSection';
import Error from '@/UI/Error';

function Comments({ comment }: { comment: Comment }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>()
    const { isLogin, userdata } = useSelector((state: RootState) => state.auth)

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(`auth/profile/${comment.postedby}`);
                setUser(response.data.user);
            } catch (err: any) {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    setError('Failed to fetch user data');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();


    }, [comment.postedby]);


    const handleDelete = () => {
        dispatch(DeleteComment(comment._id))

    }

    return (
        <div className="relative mb-6 p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            {loading ? (
                <div className="text-gray-400">Loading...</div>
            ) : error ? (
                <div className="text-red-500"><Error error={error} /></div>
            ) : (
                <div className="flex items-start space-x-4">

                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-gray-100 capitalize">{user?.name || 'Anonymous'}</span>
                            <span className="text-gray-400 text-sm">
                                {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} on {new Date(comment.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="comment-container">
                            <p dangerouslySetInnerHTML={{ __html: comment.text }} />
                        </div>
                        <div className="mt-4 flex space-x-4 text-gray-400 text-sm">
                            <button className="hover:text-blue-500 transition-colors duration-150">Reply</button>
                            {comment.postedby === userdata?._id &&
                                <>
                                    <button className="hover:text-yellow-500 transition-colors duration-150">Edit</button>
                                    <button className="hover:text-red-500 transition-colors duration-150" onClick={handleDelete}>Delete</button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Comments;
