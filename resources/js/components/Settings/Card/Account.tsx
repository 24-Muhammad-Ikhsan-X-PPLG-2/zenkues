import React from 'react';
import Card from '../Card';

const Account = () => {
    return (
        <>
            <Card title="Account" description="Manage your account settings">
                <div className="flex flex-col gap-3">
                    <button className="w-full rounded-md border border-gray-200 bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Change password
                    </button>
                    <button className="w-full rounded-md border border-gray-200 bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Manage email
                    </button>
                    <div className="mt-2 border-t border-gray-100 pt-3">
                        <button className="w-full rounded-md bg-white py-2 text-sm font-medium text-red-600 hover:bg-red-50">Delete account</button>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default Account;
