import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col fixed inset-0 backdrop-blur-3xl items-center justify-center w-full  h-full">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-6 h-6 border-10 border-t-8 border-primary border-solid rounded-full animate-spin"></div>
        <p className="text-gray-100 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
