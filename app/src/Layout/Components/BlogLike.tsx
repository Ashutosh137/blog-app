"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '@/lib/Hooks/useDebounce';
import { RootState, AppDispatch } from '@/lib/Redux/store';
import { BiSolidUpvote, BiUpvote } from 'react-icons/bi';
import { LikeBlog } from '@/lib/Redux/Blogslice/Blogslice';
import toast from 'react-hot-toast';

interface LikeProps {
    Likes: string[];
    blogId: string;
}

function Like({ Likes, blogId }: LikeProps) {
    const { userdata, isLogin } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const [liked, setLiked] = React.useState(false);

    useEffect(() => {
        if (userdata && userdata._id && Likes.includes(userdata._id)) {
            setLiked(true)
        }

    }, [userdata, Likes])

    const handleClick = useDebounce(() => {
        !isLogin && toast.error("Please Login Again")
        dispatch(LikeBlog(blogId));
        setLiked(!liked);
    }, 500);

    return (
        <span
            onClick={handleClick}
            className={`text-lg flex items-center cursor-pointer transition-all duration-300 ease-in-out 
                    ${liked ? 'text-green-500 hover:text-green-600' : 'text-gray-500 hover:text-gray-600'} 
                    `}
        >
            {Likes.length > 0 && <span className="ml-2 pr-2 text-sm text-center text-gray-400">{liked ? Likes.length + 1 : Likes.length}</span>}
            {liked ? <BiSolidUpvote /> : <BiUpvote />}
            <p className="ml-2 text-lg font-semibold"> Upvote</p>
        </span>
    );
}

export default Like;
