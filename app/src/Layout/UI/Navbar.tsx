"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "@/Redux/store";
import { fetchUser, logout } from '@/Redux/Authslice/Authslice';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isLogin } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
        setIsOpen(false);
    };

    useEffect(() => {
        isLogin ? router.push("/") : dispatch(fetchUser())
    }, [])

    return (
        <nav className="bg-bgSecondary text-white p-4 ">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link href="/">blogup</Link>
                </div>
                <div className="hidden md:flex space-x-4">
                    <Link href="/" className="hover:bg-gray-700 px-3 py-2 rounded">Home</Link>
                    <Link href="/Blog" className="hover:bg-gray-700 px-3 py-2 rounded">All Blogs</Link>
                    <Link href="/CreateBlog" className="hover:bg-gray-700 px-3 py-2 rounded">Create Blog</Link>
                    {!isLogin && (
                        <>
                            <Link href="/login" className="hover:bg-gray-700 px-3 py-2 rounded">Login</Link>
                            <Link href="/register" className="hover:bg-gray-700 px-3 py-2 rounded">Register</Link>
                        </>
                    )}
                    {isLogin && (
                        <>
                            <Link href="/profile" className="hover:bg-gray-700 px-3 py-2 rounded">Profile</Link>
                            <button onClick={handleLogout} className="hover:bg-gray-700 px-3 py-2 rounded">Logout</button>
                        </>
                    )}
                </div>
                <button onClick={toggleMenu} className="md:hidden text-xl">
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>
            {/* Mobile Menu */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} bg-gray-800 fixed top-0 right-0 w-64 h-full z-20`}>
                <div className="p-4 space-y-4">
                    <Link href="/" className="block px-3 py-2 text-gray-200 hover:bg-gray-700 rounded" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link href="/Blog" className="block px-3 py-2 text-gray-200 hover:bg-gray-700 rounded" onClick={() => setIsOpen(false)}>All Blogs</Link>
                    <Link href="/CreateBlog" className="block px-3 py-2 text-gray-200 hover:bg-gray-700 rounded" onClick={() => setIsOpen(false)}>Create Blog</Link>
                    {!isLogin && (
                        <>
                            <Link href="/login" className="block px-3 py-2 text-gray-200 hover:bg-gray-700 rounded" onClick={() => setIsOpen(false)}>Login</Link>
                            <Link href="/register" className="block px-3 py-2 text-gray-200 hover:bg-gray-700 rounded" onClick={() => setIsOpen(false)}>Register</Link>
                        </>
                    )}
                    {isLogin && (
                        <>
                            <Link href="/profile" className="block px-3 py-2 text-gray-200 hover:bg-gray-700 rounded" onClick={() => setIsOpen(false)}>Profile</Link>
                            <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-gray-200 hover:bg-gray-700 rounded">Logout</button>
                        </>
                    )}
                </div>
            </div>
            {/* Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={toggleMenu}></div>
            )}
        </nav>
    );
};

export default Navbar;
