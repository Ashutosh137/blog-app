"use client"
import { axiosInstance } from '@/Axios/config';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface User {
    _id: string;
    name: string;
}

interface UsersProps {
    userid: string;
    size?: 'small' | 'large';
}

const Users: React.FC<UsersProps> = ({ userid, size = 'large' }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get(`auth/profile/${userid}`);
                setUser(response.data.user);
            } catch (error: any) {
            }
        };

        fetchUserData();
    }, [userid]);

    if (!user) return null;

    const renderSmallUI = () => (
        <div className="flex w-full mr-10 items-center space-x-3 p-3 rounded-lg bg-gray-800 shadow-md border border-gray-700">
            <img
                src={`https://via.placeholder.com/50?text=${user.name}`}
                alt="Profile Avatar"
                className="size-10 rounded-full object-cover border-2 border-primary"
            />
            <div className="text-gray-200">
                <Link href={`/Profile/${user._id}`} className="text-sm font-semibold capitalize hover:text-primary transition-colors">
                    {user.name || 'Anonymous'}
                </Link>
            </div>
        </div>
    );

    const renderLargeUI = () => (
        <div className="flex w-full items-center space-x-6 p-6 rounded-lg bg-bgSecondary shadow-lg border border-gray-700">
            <img
                src={`https://via.placeholder.com/200?text=${user.name}`}
                alt="Profile Avatar"
                className="size-16 rounded-full object-cover shadow-lg border-2 border-primary"
            />
            <div className="text-gray-100">
                <h1 className="text-xl font-semibold capitalize">{user.name}</h1>
                <Link href={`/Profile/${user._id}`} className="text-gray-400 text-sm hover:text-primary transition-colors">View Profile</Link>
            </div>
        </div>
    );

    return size === 'small' ? renderSmallUI() : renderLargeUI();
};

export default Users;
