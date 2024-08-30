"use client"
import { RootState } from '@/lib/Redux/store'
import React from 'react'
import { useSelector } from 'react-redux'
import CreateBlog from './CreateBlog'

function EditBlog() {
  const { blog } = useSelector((state: RootState) => state.blog)
  return (
    <CreateBlog Edit={true} Blog={blog} />
  )
}

export default EditBlog