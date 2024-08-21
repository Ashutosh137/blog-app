import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant?: 'primary' | 'secondary';
    icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ label, variant = 'primary', icon, ...props }) => {
    const buttonClass = variant === 'primary'
        ? 'bg-primary2 text-white hover:bg-primary3 focus:ring-blue-300'
        : 'bg-secondary2 text-white hover:bg-seconadry3 focus:ring-gray-300';

    return (
        <button
            className={`inline-flex capitalize items-center py-2 px-4 rounded-md border border-transparent transition-transform transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonClass}`}
            {...props}
        >
            {icon && <span className="mr-1">{icon}</span>}
            {label}
        </button>
    );
};

export default Button;
