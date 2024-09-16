"use client";
import React, { Key, useEffect, useState } from "react";
import BlogContainerMask from "../UI/BlogContainerMask";
import BlogContainer from "../UI/BlogContainer";
import Link from "next/link";
import { Blog } from "@/lib/Redux/Blogslice/Blogslice";

function BlogsGroup({ BlogPost }: { BlogPost: Blog[] }) {
  const [Sort, setSort] = useState<
    "newest" | "like" | "oldest" | "default" | string
  >("default");
  const [Blogs, setBlogs] = useState<Blog[]>(BlogPost);

  useEffect(() => {
    let sortedBlogs = [...Blogs];

    if (Sort === "newest") {
      sortedBlogs = sortedBlogs.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    } else if (Sort === "oldest") {
      sortedBlogs = sortedBlogs.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
    } else if (Sort === "like") {
      sortedBlogs = sortedBlogs.sort((a, b) => b.likes.length - a.likes.length);
    } else if (Sort === "default") {
      sortedBlogs = [...BlogPost];
    }

    setBlogs(sortedBlogs);
  }, [Sort, BlogPost]);

  if (BlogPost.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-200 mb-4">
          No Blog Posts Found
        </h2>
        <p className="text-gray-400">
          We couldn’t find any blog posts at the moment. Please check back
          later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex mx-auto  mt-10 p-2 flex-col">
      <div className="flex w-full space-x-5 px-5">
        <h3 className="text-2xl capitalize">Filter</h3>
        <select
          className="text-base w-full max-w-40 font-medium text-black capitalize p-2 border border-primary rounded-md "
          name="Sort"
          value={Sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="newest">Newest</option>
          <option value="like">Most Liked</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      <ul className="flex flex-col space-y-9 my-12 ">
        {Blogs.map((blogpost: Blog, index: Key) => (
          <Link href={`/Blog/${blogpost._id}`} key={index} passHref>
            <BlogContainerMask>
              <BlogContainer blog={blogpost} />
            </BlogContainerMask>
          </Link>
        ))}
      </ul>
      <p className="text-gray-700 text-lg text-center  mt-5">
        ***---Nothing Else---***
      </p>
    </div>
  );
}

export default BlogsGroup;
