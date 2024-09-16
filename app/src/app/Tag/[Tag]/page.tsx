import React from "react";
import BlogsGroup from "@/Layout/Components/BlogsGroup";
import { axiosInstance } from "@/Axios/config";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: any }) {
  try {
    const { Tag } = params;
    const response = await axiosInstance(`/blog/tag/${Tag}`);
    const { blogPost } = response.data;

    return (
      <div className="min-h-screen text-gray-100">
        <div className="container mx-auto p-6">
          <div className="mb-12">
            <h2 className="text-4xl text-center font-extrabold text-gray-100 mb-4 bg-gradient-to-r from-blue-900 to-purple-600 bg-clip-text text-transparent">
              Posts Tagged with{" "}
              <span className="text-blue-300">&quot;{Tag}&quot;</span>
            </h2>
            <p className="text-gray-400 text-center text-lg">
              Explore the latest articles and insights related to{" "}
              <span className="text-blue-300">{Tag}</span>.
            </p>
          </div>
          <BlogsGroup BlogPost={blogPost} />
        </div>
      </div>
    );
  } catch (err) {
    console.log(err);
    notFound();
  }
}
