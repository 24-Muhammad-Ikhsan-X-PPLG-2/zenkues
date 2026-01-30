import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    provider?: 'google';
    children?: React.ReactNode;
};

export default function SocialButton({ provider = 'google', children, ...props }: Props) {
    return (
        <button
            type="button"
            {...props}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition duration-200 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
        >
            {provider === 'google' && <img src="/icons/google-icon.svg" className="size-5" alt="" />}
            <span>{children}</span>
        </button>
    );
}
