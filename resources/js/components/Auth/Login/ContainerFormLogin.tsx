import React, { FC, PropsWithChildren } from 'react';

const ContainerFormLogin: FC<PropsWithChildren> = ({ children }) => {
    return (
        <main className="relative z-10 w-full max-w-md p-6">
            <div className="rounded-2xl border border-gray-100 bg-white/95 p-8 shadow-lg backdrop-blur-sm">{children}</div>
        </main>
    );
};

export default ContainerFormLogin;
