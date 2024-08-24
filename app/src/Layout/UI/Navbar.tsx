"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "@/Redux/store";
import { fetchUser, logout } from '@/Redux/Authslice/Authslice';
import { useRouter } from 'next/navigation';
import { BiHome, BiLogOut } from 'react-icons/bi';
import { CgLogIn, CgProfile } from 'react-icons/cg';
import { IoNewspaper } from 'react-icons/io5';
import { LiaRegisteredSolid } from 'react-icons/lia';
import { IoIosCreate } from 'react-icons/io';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isLogin, userdata } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
        setIsOpen(false);
        router.push("/");
    };

    useEffect(() => {
        isLogin ? router.push("/") : dispatch(fetchUser());
    }, []);

    const handleNavigation = (path: string) => {
        setIsOpen(false);
        router.push(path);
    };

    return (
        <nav className="bg-bgSecondary text-white p-4">
            <div className="container mx-auto p-5 flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link href="/">Blogup</Link>
                </div>
                <div className="hidden md:flex space-x-6 items-center">
                    <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 px-3 py-2 rounded" onClick={() => handleNavigation("/")}>
                        <BiHome className='text-2xl' title='Home' />
                        <span>Home</span>
                    </div>
                    <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 px-3 py-2 rounded" onClick={() => handleNavigation("/Blog")}>
                        <IoNewspaper className='text-2xl' title='Blogs' />
                        <span>All Blogs</span>
                    </div>

                    {!isLogin && (
                        <>
                            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 px-3 py-2 rounded" onClick={() => handleNavigation("/login")}>
                                <CgLogIn className='text-2xl' title='Login' />
                                <span>Login</span>
                            </div>
                            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 px-3 py-2 rounded" onClick={() => handleNavigation("/register")}>
                                <LiaRegisteredSolid className='text-2xl' title='Register' />
                                <span>Register</span>
                            </div>
                        </>
                    )}
                    {isLogin && (
                        <>
                            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 px-3 py-2 rounded" onClick={() => handleNavigation("/CreateBlog")}>
                                <IoIosCreate className='text-2xl' title='Create Blog' />
                                <span>Create Blog</span>
                            </div>
                            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 px-3 py-2 rounded" onClick={() => handleNavigation(`/Profile/${userdata._id}`)}>
                                <CgProfile className='text-2xl' title='Profile' />
                                <span>Profile</span>
                            </div>
                            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 px-3 py-2 rounded" onClick={handleLogout}>
                                <BiLogOut className='text-2xl' title='Logout' />
                                <span>Logout</span>
                            </div>
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
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} transition-transform animate-swip duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} bg-gray-800 fixed top-0 right-0 w-64 h-full z-50`}>
                <div className="p-4 space-y-4">
                    <div className="flex items-center space-x-2 cursor-pointer text-gray-200 hover:bg-gray-700 px-3 py-2 rounded" onClick={() => handleNavigation("/")}>
                        <BiHome className='text-2xl' title='Home' />
                        <span>Home</span>
                    </div>
                    <div className="flex items-center space-x-2 cursor-pointer text-gray-200 hover:bg-gray-700 px-3 py-2 rounded" onClick={() => handleNavigation("/Blog")}>
                        <IoNewspaper className='text-2xl' title='Blogs' />
                        <span>All Blogs</span>
                    </div>
                    <div className="flex items-center space-x-2 cursor-pointer text-gray-200 hover:bg-gray-700 px-3 py-2 rounded" onClick={() => handleNavigation("/CreateBlog")}>
                        <IoIosCreate className='text-2xl' title='Create Blog' />
                        <span>Create Blog</span>
                    </div>
                    {!isLogin && (
                        <>
                            <div className="flex items-center space-x-2 cursor-pointer text-gray-200 hover:bg-gray-700 px-3 py-2 rounded" onClick={() => handleNavigation("/login")}>
                                <CgLogIn className='text-2xl' title='Login' />
                                <span>Login</span>
                            </div>
                            <div className="flex items-center space-x-2 cursor-pointer text-gray-200 hover:bg-gray-700 px-3 py-2 rounded" onClick={() => handleNavigation("/register")}>
                                <LiaRegisteredSolid className='text-2xl' title='Register' />
                                <span>Register</span>
                            </div>
                        </>
                    )}
                    {isLogin && (
                        <>
                            <div className="flex items-center space-x-2 cursor-pointer text-gray-200 hover:bg-gray-700 px-3 py-2 rounded" onClick={() => handleNavigation(`/Profile/${userdata._id}`)}>
                                <CgProfile className='text-2xl' title='Profile' />
                                <span>Profile</span>
                            </div>
                            <div className="flex items-center space-x-2 cursor-pointer text-gray-200 hover:bg-gray-700 px-3 py-2 rounded" onClick={handleLogout}>
                                <BiLogOut className='text-2xl' title='Logout' />
                                <span>Logout</span>
                            </div>
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
