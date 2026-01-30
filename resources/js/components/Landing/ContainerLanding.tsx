import React, { FC, PropsWithChildren } from 'react';

const ContainerLanding: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>
        </div>
    );
};

export default ContainerLanding;
