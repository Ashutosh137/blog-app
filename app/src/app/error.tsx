"use client";
import React from 'react';
import { AiOutlineWarning } from 'react-icons/ai';

function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-100">
      <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg max-w-md">
        <AiOutlineWarning className="text-yellow-500 text-6xl mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">Something Went Wrong</h1>
        <p className="text-gray-400 mb-6">
          We encountered an unexpected error. Please try reloading the page, or return to the homepage.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            Reload
          </button>
          <a
            href="/"
            className="bg-gray-700 text-gray-200 px-4 py-2 rounded shadow hover:bg-gray-600 transition duration-150 ease-in-out"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default Error;
