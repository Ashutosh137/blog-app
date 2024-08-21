import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-6 h-6 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="text-gray-100 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
