"use client";
import React, { useState } from 'react';
import "@/assets/comment.css"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/store';
import { Comment, deleteComment } from '@/Redux/Commentslice/commentslice';
import { MdDeleteForever } from 'react-icons/md';
import Users from './User';

function Comments({ comment }: { comment: Comment }) {
    const dispatch = useDispatch<AppDispatch>()
    const [isDeleted, setisDeleted] = useState(false)
    const { userdata } = useSelector((state: RootState) => state.auth)


    const handleDelete = () => {
        dispatch(deleteComment(comment._id))
        setisDeleted(true)
    }

    return (
        <div className="relative mb-6 sm:p-6 p-2 bg-gray-800 rounded-lg border border-gray-700">
            {isDeleted ? <h2 className='text-xl text-center'>Comment Deleted</h2>
                :
                <>
                    <div className="flex items-start space-x-4">

                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <Users userid={comment.postedby} size='small' />
                                <span className="text-gray-400 text-sm">
                                    {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} on {new Date(comment.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="comment-container">
                                <p dangerouslySetInnerHTML={{ __html: comment.text }} />
                            </div>
                            {comment.postedby === userdata?._id &&
                                <div className="mt-4 flex space-x-4 text-gray-400 text-sm">
                                    <button className="hover:text-red-500 transition-colors duration-150" onClick={handleDelete}><MdDeleteForever className='text-2xl' /></button>
                                </div>
                            }
                        </div>
                    </div>

                </>
            }
        </div>

    );
}

export default Comments;
