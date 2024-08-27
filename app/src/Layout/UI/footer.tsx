import Link from 'next/link';
import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-900 py-10 mt-24">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <div className="flex flex-wrap justify-between items-start text-gray-400">
                    <div className="w-full md:w-1/3 lg:w-1/4 text-center md:text-left mb-6 md:mb-0">
                        <h2 className="text-white text-xl font-bold mb-2">MyBlog</h2>
                        <p className="text-base mr-10">Your go-to platform for insightful blogs, tutorials, and community discussions. Join us and start your journey into the world of knowledge.</p>
                    </div>
                    
                    <div className="w-full md:w-1/3 lg:w-1/4 mb-6 md:mb-0">
                        <h3 className="text-white text-lg font-semibold mb-4">Explore</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:text-white transition-colors duration-300">Home</Link></li>
                            <li><Link href="/Blog" className="hover:text-white transition-colors duration-300">Blog</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors duration-300">Profile</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors duration-300">About Us</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors duration-300">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className="w-full md:w-1/3 lg:w-1/4 mb-6 md:mb-0">
                        <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-white transition-colors duration-300">Tutorials</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors duration-300">Guides</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors duration-300">FAQ</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors duration-300">Support</Link></li>
                        </ul>
                    </div>

                    <div className="w-full md:w-1/3 lg:w-1/4">
                        <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors duration-300">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors duration-300">Cookie Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors duration-300">Disclaimer</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
                    <p>&copy; 2024 MyBlog. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
