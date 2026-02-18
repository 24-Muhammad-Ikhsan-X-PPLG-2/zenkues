import React, { FC, useRef, useState } from 'react';

const AvatarUploader: FC<{
    onChange: (file: File | null) => void;
    setShowCropper: (show: boolean) => void;
    setPreview: (preview: string | undefined) => void;
    preview: string | undefined;
}> = ({ preview, onChange, setShowCropper, setPreview }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleFile = (file: File | null) => {
        if (!file) {
            console.log('No file selected');
            setPreview(undefined);
            onChange(null);
            setShowCropper(false);
            return;
        }
        onChange(file);
        setShowCropper(true);
    };

    return (
        <div className="flex items-center gap-4">
            <div className="relative">
                <div className="h-28 w-28 overflow-hidden rounded-full bg-indigo-50 shadow-sm dark:bg-gray-800">
                    {preview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={preview} alt="avatar" className="h-full w-full object-cover" />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-indigo-600">U</div>
                    )}
                </div>
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="absolute -right-2 -bottom-2 cursor-pointer rounded-full bg-white p-1 text-sm shadow hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                    aria-label="Upload avatar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11V3m0 0l3.5 3.5M12 3L8.5 6.5" />
                    </svg>
                </button>
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    handleFile(e.target.files ? e.target.files[0] : null);
                    e.target.value = '';
                }}
            />
        </div>
    );
};

export default AvatarUploader;
