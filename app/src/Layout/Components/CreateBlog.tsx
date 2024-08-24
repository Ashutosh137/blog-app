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
                }
                else {
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
        <div className="max-w-screen-lg mx-auto mt-8 p-6 bg-bgSecondary text-gray-100 shadow-xl rounded-xl">
            <Heading label={Edit ? "Edit Blog" : "Create Blog"} />
            <form onSubmit={handleBlogSave} className="space-y-7">
                <div>
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter blog title"
                        className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className='pb-10'>
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="content">
                        Content
                    </label>
                    <ReactQuill
                        value={blogContent}
                        onChange={setBlogContent}
                        className="h-64 bg-gray-800 border border-gray-600 rounded-md"
                        theme="snow"
                    />
                </div>

                <div className='my-5'>
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="tags">
                        Tags
                    </label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="Add a tag"
                            className="flex-1 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Button
                            label="Add Tag"
                            type="button"
                            onClick={handleAddTag}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="added-tags">
                        Added Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {blogTags.map((tag, index) => (
                            <div key={index} className="bg-gray-700 text-gray-200 py-1 px-3 rounded-md flex items-center space-x-2">
                                <span>{tag}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    className="text-gray-400 hover:text-gray-200"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex space-x-2">
                    <Button
                        label="Save"
                        type="submit"
                    />
                    <Button
                        variant="secondary"
                        type="button"
                        label="Cancel"
                        onClick={resetForm}
                        className="bg-gray-700 text-gray-300 hover:bg-gray-600 px-4 py-2 rounded"
                    />
                    <Button
                        label="Preview"
                        type="button"
                        onClick={handlePreview}
                        className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded"
                    />
                </div>
            </form>

            {preview && (
                <div className="mt-6   p-4 border border-gray-600 rounded-md bg-gray-800">
                    <h2 className="text-lg font-bold mb-2 text-white">Preview</h2>
                    <div dangerouslySetInnerHTML={{ __html: preview }} className="blog-container" />
                </div>
            )}
        </div>
    );
}

export default CreateBlog;
