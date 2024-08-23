"use client"
import { Blog, DeleteBlog } from '@/Redux/Blogslice/Blogslice'
import { AppDispatch, RootState } from '@/Redux/store'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../UI/button'
import { MdDelete } from 'react-icons/md'
import { CgEditBlackPoint } from 'react-icons/cg'
import CreateBlog from '../Components/CreateBlog'
import { useRouter } from 'next/navigation'

function Controller({ Blog }: { Blog: Blog }) {
    const { isLogin, userdata } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>()
    const navigate=useRouter()

    const [Edit, setEdit] = useState(false)
    const [Delete, setDelete] = useState(false)

    const handleDelete = () => {
        dispatch(DeleteBlog(Blog._id))
        handleDeleteToggle()
        navigate.push("Blog")

    }

    const handleEdit = () => {
        setEdit(true)
    }

    const handleDeleteToggle = () => {
        setDelete(prev => !prev)
    }

    return (
        <>
            {(isLogin && userdata?._id === Blog.postedby) &&
                <div className="flex flex-col space-y-3 py-2">
                    <Button icon={<CgEditBlackPoint />} label='Edit' onClick={handleEdit} />
                    <Button icon={<MdDelete />} label='Delete' variant='secondary' onClick={handleDeleteToggle} />
                </div>
            }

            {Edit && (
                <div className='fixed w-screen backdrop-blur-3xl h-screen overflow-y-scroll inset-0 flex justify-center items-center z-50'>
                    <div className="p-2 sm:p-6  min-w-3xl rounded-lg h-full ">
                        <CreateBlog Toggle={() => setEdit(false)} Blog={Blog} Edit />
                    </div>
                </div>
            )}

            {Delete && (
                <div className='fixed h-screen w-screen text-white inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50'>
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                        <p className="mb-4 text-base capitalize">Are you sure you want to delete this blog?</p>
                        <div className="flex justify-center space-x-4 mt-2">
                            <Button label='Delete' variant='secondary' onClick={handleDelete} />
                            <Button label='Cancel' variant='primary' onClick={handleDeleteToggle} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Controller
