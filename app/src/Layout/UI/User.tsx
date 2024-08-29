import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface User {
    _id: string;
    name: string;
}

interface UsersProps {
    user: User;
    size?: 'small' | 'large';
}

const Users: React.FC<UsersProps> = ({ user, size = 'large' }) => {

    const renderSmallUI = () => (
        <div className="flex w-full mr-10 items-center space-x-3 p-3 rounded-lg  shadow-md ">
            <Image
                src={`https://via.placeholder.com/50?text=${user.name}`}
                alt="Profile Avatar"
                width={16}
                height={16}
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
        <div className="flex w-full items-center space-x-6 p-6 rounded-lg border-2 border-bgPrimary  shadow-lg ">
            <Image
                src={`https://via.placeholder.com/200?text=${user.name}`}
                alt="Profile Avatar"
                width={16}
                height={16}
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
