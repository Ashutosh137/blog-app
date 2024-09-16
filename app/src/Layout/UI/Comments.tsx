"use client";
import React, { useEffect, useState } from "react";
import "@/assets/comment.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/Redux/store";
import {
  Comment,
  deleteComment,
  LikeComment,
} from "@/lib/Redux/Commentslice/commentslice";
import { MdDeleteForever } from "react-icons/md";
import FetchUser from "../Components/fetchUser";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import useDebounce from "@/lib/Hooks/useDebounce";
import toast from "react-hot-toast";

function Comments({ comment }: { comment: Comment }) {
  const dispatch = useDispatch<AppDispatch>();
  const [isDeleted, setisDeleted] = useState(false);
  const { userdata } = useSelector((state: RootState) => state.auth);
  const [liked, setliked] = useState(false);

  useEffect(() => {
    if (comment.likes.includes(userdata._id)) {
      setliked(true);
    }
  }, []);

  const handleDelete = () => {
    dispatch(deleteComment(comment._id));
    setisDeleted(true);
  };
  const handleLikeComment = () => {
    !userdata && toast.error("Please Login Again");
    dispatch(LikeComment(comment._id));
    setliked(!liked);
  };
  const handleLike = useDebounce(handleLikeComment, 500);

  return (
    <div className="relative mb-6 sm:p-6 p-2 bg-gray-800 rounded-lg border border-gray-700">
      {isDeleted ? (
        <h2 className=" text-sm sm:text-base text-center text-gray-300">
          Comment Deleted
        </h2>
      ) : (
        <>
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <FetchUser ui="small" id={comment.postedby} />

                <span className="text-gray-400 text-sm">
                  {new Date(comment.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  on {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="comment-container">
                <p dangerouslySetInnerHTML={{ __html: comment.text }} />
              </div>
              <div className="mt-4 flex text-2xl space-x-4 text-gray-400">
                {(comment.postedby === userdata?._id || userdata?.isAdmin) && (
                  <button
                    className="hover:text-red-500 transition-colors duration-150"
                    onClick={handleDelete}
                  >
                    <MdDeleteForever />
                  </button>
                )}
                <button
                  className="hover:text-green-500 transition-colors duration-150"
                  onClick={handleLike}
                >
                  {" "}
                  {liked ? <AiFillLike /> : <AiOutlineLike />}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Comments;
