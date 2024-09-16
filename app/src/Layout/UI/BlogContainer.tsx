import React from "react";
import Controller from "./Controller";
import Tag from "../../UI/tag";
import "@/assets/blog.css";
import Share from "./share";
import FetchUser from "../Components/fetchUser";
import Like from "../Components/BlogLike";
import { Blog } from "@/lib/Redux/Blogslice/Blogslice";

function BlogContainer({ blog }: { blog: Blog }) {
  return (
    <article className=" pt-10 sm:pt-16 border bg-[#1e293b] border-gray-700 shadow-sm rounded-md sm:my-5 mx-auto sm:py-12 py-5 px-2 sm:px-4">
      <div className="rounded-lg space-y-6">
        <h1 className="text-[1.5rem] sm:text-[2.5rem] border-b-4 border-primary mx-4 sm:mx-8 pb-2 font-extrabold text-pretty text-primary mb-4">
          {blog.title}
        </h1>

        <div className="flex flex-wrap px-4 sm:px-8 gap-3 mb-6">
          {blog.tags?.map((tag: string, index: React.Key) => (
            <Tag label={tag} key={index} />
          ))}
        </div>

        <div
          className="prose prose-invert mb-6 text-gray-200 blog-container"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <hr className="border-gray-700" />

        <div className="flex justify-between items-center px-4 sm:px-8 mt-6">
          <div className="flex items-center text-sm text-gray-200 space-x-2">
            <p>
              {new Date(blog.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              on {new Date(blog.created_at).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Like blogId={blog._id} Likes={blog.likes!} />
            <Share Blogid={blog._id} title={blog.title} />
          </div>
        </div>

        <div className="flex justify-between items-center border rounded-md border-bgPrimary text-gray-400 text-sm p-3 mt-6">
          <FetchUser ui="large" id={blog.postedby} />
          <Controller Blog={blog} />
        </div>
      </div>
    </article>
  );
}

export default BlogContainer;
