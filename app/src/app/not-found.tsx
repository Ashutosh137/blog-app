"use client"
import React from 'react';
import { AiOutlineFrown } from 'react-icons/ai';


function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-100">
      <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg max-w-md">
        <AiOutlineFrown className="text-red-500 text-6xl mx-auto mb-4" />
        <h1 className="text-5xl font-extrabold mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-6">
          Sorry, the page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="/"
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            Go Home
          </a>
          <button
            onClick={() => window.history.back()}
            className="bg-gray-700 text-gray-200 px-4 py-2 rounded shadow hover:bg-gray-600 transition duration-150 ease-in-out"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
