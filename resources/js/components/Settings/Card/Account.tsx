import React, { FC } from 'react';
import Card from '../Card';
import { Link } from '@inertiajs/react';

type Props = {
    setShowModalDelete: (v: boolean) => void;
};

const Account: FC<Props> = ({ setShowModalDelete }) => {
    return (
        <>
            <Card title="Account" description="Manage your account settings">
                <div className="flex flex-col gap-3">
                    <Link href={'/profile/change-password'}>
                        <button className="w-full cursor-pointer rounded-md border border-gray-200 bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
                            Change password
                        </button>
                    </Link>
                    <Link href={'/profile'}>
                        <button className="w-full cursor-pointer rounded-md border border-gray-200 bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
                            Manage profile
                        </button>
                    </Link>
                    <div className="mt-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                        <button
                            onClick={() => setShowModalDelete(true)}
                            className="w-full cursor-pointer rounded-md border border-gray-200 bg-white py-2 text-sm font-medium text-red-500 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
                        >
                            Delete account
                        </button>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default Account;
