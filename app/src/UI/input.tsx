"use client";
import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
    return (
        <div className="flex flex-col my-2 p-1 border-1 border-black rounded-md">
            {label && (
                <label htmlFor={props.name} className="mb-1 capitalize text-gray-400">
                    {label}
                </label>
            )}
            <input
                className="w-full text-black p-2 mb-4 border border-gray-300  rounded"
                placeholder={label}
                {...props}
            />
        </div>
    );
};

export default Input;
