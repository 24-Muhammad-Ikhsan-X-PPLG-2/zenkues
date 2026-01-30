import React, { FC, PropsWithChildren } from 'react';

const ContainerLogin: FC<PropsWithChildren> = ({ children }) => {
    return <div className="relative flex min-h-screen items-center justify-center bg-white">{children}</div>;
};

export default ContainerLogin;
