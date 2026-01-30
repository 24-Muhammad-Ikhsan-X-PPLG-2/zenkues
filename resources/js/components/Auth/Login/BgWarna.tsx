import React from 'react';

const BgWarna = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 h-72 w-72 -translate-x-1/3 -translate-y-1/3 transform rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-60 blur-3xl"></div>
            <div className="absolute right-0 bottom-0 h-96 w-96 translate-x-1/4 translate-y-1/4 transform rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 opacity-40 blur-3xl"></div>
        </div>
    );
};

export default BgWarna;
