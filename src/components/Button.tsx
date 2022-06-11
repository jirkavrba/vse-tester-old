import React from "react";

export interface ButtonProps {
    onClick: () => void
    disabled?: boolean,
    children?: React.ReactNode,
}

const Button: React.FC<ButtonProps> = ({children = [], disabled = false, onClick}: ButtonProps) => {

    return (
        <button className={`flex flex-row items-center justify-center mt-5 w-full font-bold uppercase tracking-wide text-sm py-5 rounded-lg transition ${disabled ? 'bg-neutral-800 text-neutral-700' : 'bg-neutral-700 text-white hover:bg-neutral-600' }`} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;