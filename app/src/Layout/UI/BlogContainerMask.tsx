import React from 'react';

function BlogContainerMask({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative max-w-5xl mx-auto max-h-96 overflow-hidden group border rounded-md  border-primary hover:scale-[1.01] hover:rounded-lg transition-all ease-in-out duration-1000">
            {children}
            <div className="absolute bottom-0 z-40 left-0 w-full h-40 bg-gradient-to-t  from-gray-900 to-transparent flex items-end justify-center transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0">
                <div className="text-gray-300 bg-opacity-75 px-5 py-3 rounded-t-xl shadow-xl transform group-hover:scale-105 transition-transform duration-300 ease-in-out">
                    Continue Reading
                </div>
            </div>
        </div>
    );
}

export default BlogContainerMask;
