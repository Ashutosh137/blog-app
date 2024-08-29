"use client";
import React, { FormEvent, useState } from 'react';
import Button from '@/UI/button';
import Heading from '@/UI/heading';
import { createBlog, editBlog } from '@/Redux/Blogslice/Blogslice';
import { AppDispatch, RootState } from '@/Redux/store';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import "@/assets/blog.css"
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function CreateBlog({ Edit, Blog, Toggle }: { Edit?: boolean, Blog?: any, Toggle?: () => void }) {
    const [blogContent, setBlogContent] = useState(Blog?.content || "");
    const [blogTags, setBlogTags] = useState<string[]>(Blog?.tags || []);
    const [newTag, setNewTag] = useState("");
    const [title, setTitle] = useState(Blog?.title || "");
    const [preview, setPreview] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { isLogin } = useSelector((state: RootState) => state.auth);

    const handleBlogSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (blogContent.trim() && title.trim()) {
            if (isLogin) {
                if (!Edit) {
                    const newBlog = { content: blogContent, tags: blogTags, title };
                    dispatch(createBlog(newBlog));
                } else {
                    const UpdatedBlog = {
                        content: blogContent,
                        tags: blogTags,
                        title: title,
                        _id: Blog._id
                    }
                    dispatch(editBlog(UpdatedBlog))
                    Toggle && Toggle()
                }
                resetForm();
            } else {
                toast.error("Please Login Again")
            }
        }
    };

    const handleAddTag = () => {
        if (newTag.trim() && !blogTags.includes(newTag)) {
            setBlogTags([...blogTags, newTag.trim().replaceAll(" ", "-")]);
            setNewTag("");
        }
    };

    const handleRemoveTag = (tag: string) => {
        setBlogTags(blogTags.filter((t) => t !== tag));
    };

    const handlePreview = () => {
        setPreview(blogContent);
    };

    const resetForm = () => {
        setBlogContent("");
        setTitle("");
        setBlogTags([]);
        setPreview(null);
        Toggle && Toggle()
    };

    return (
        <div className="max-w-screen-lg mx-auto mt-8 p-3 sm:p-8 bg-bgSecondary border border-primary text-gray-100 shadow-xl rounded-xl">
            <div className="container mx-auto my-10 px-6 md:px-12 lg:px-20 text-center mb-12  p-3 sm:p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl md:text-4xl font-extrabold leading-tight animate-fadeInUp text-white">
                    Welcome to Your Blog Space
                </h1>
                <p className="mt-4 text-base md:text-lg text-gray-300 animate-fadeInUp delay-200">
                    Express your thoughts, share your stories, and connect with a like-minded community.
                </p>
            </div>

            <form onSubmit={handleBlogSave} className="space-y-4 border border-bgPrimary rounded-xl p-5">
                <Heading label={Edit?"edit blog":'write your blog '}/>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter blog title"
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform"
                    />
                </div>

                <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="content">
                        Content
                    </label>
                    <ReactQuill
                        value={blogContent}
                        onChange={setBlogContent}
                        className=" bg text-white border border-gray-600 rounded-md"
                    />
                </div>

                <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="tags">
                        Tags
                    </label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="Add a tag"
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform "
                        />
                        <Button
                            label="Add Tag"
                            type="button"
                            onClick={handleAddTag}
                        />
                    </div>
                </div>

                {blogTags.length!==0 && <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
                    <div className="flex flex-wrap gap-2">
                        {blogTags.map((tag, index) => (
                            <div key={index} className="bg-gray-700 text-gray-200 py-1 px-3 rounded-md flex items-center space-x-2">
                                <span>{tag}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    className="text-gray-400 hover:text-gray-200 transition duration-300 ease-in-out"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>}

                <div className="flex space-x-2">
                    <Button
                        label="Save"
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
                    />
                    <Button
                        variant="secondary"
                        type="button"
                        label="Cancel"
                        onClick={resetForm}
                        className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-md transition duration-300 ease-in-out"
                    />
                    <Button
                        label="Preview"
                        type="button"
                        onClick={handlePreview}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
                    />
                </div>
            </form>

            {preview && (
                <div className="mt-6 p-4 border border-gray-600 rounded-md bg-gray-800 shadow-lg">
                    <h2 className="text-lg font-bold mb-2 text-white">Preview</h2>
                    <div dangerouslySetInnerHTML={{ __html: preview }} className="blog-container" />
                </div>
            )}
        </div>
    );
}

export default CreateBlog;
