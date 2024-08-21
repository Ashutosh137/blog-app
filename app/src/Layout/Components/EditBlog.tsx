"use client"
import { RootState } from '@/Redux/store'
import React from 'react'
import { useSelector } from 'react-redux'
import CreateBlog from './CreateBlog'

function EditBlog() {
    const {blog}= useSelector((state:RootState)=>state.blog)




  return (
    <div><CreateBlog Edit={true} Blog={blog}/></div>
  )
}

export default EditBlog