import { axiosInstance } from '@/Axios/config'
import Link from 'next/link';
import React from 'react'

async function Users({ userid }: { userid: string; }) {
    const response = await axiosInstance.get(`auth/profile/${userid}`)
    const { name } = response.data.user

    return (
        <div className="flex flex-1 items-center space-x-4 p-4 rounded-lg shadow-lg border border-gray-700 ">
            <img
                src={`https://via.placeholder.com/200?text=${name}`}
                alt="Profile Avatar"
                className="size-12 rounded-full object-cover shadow-md border-2 border-primary"
            />
            <div className="text-gray-100 my-auto">
                <h1 className="text-lg font-semibold capitalize">{name}</h1>
                <Link href={`/Profile/${userid}`} className="text-gray-400 text-sm">Profile</Link>
            </div>
        </div>
    )

}

export default Users