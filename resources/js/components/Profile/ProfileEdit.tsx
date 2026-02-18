import React, { FC } from 'react';
import AvatarUploader from './AvatarUploader';
import Field from './Field';
import { usePage } from '@inertiajs/react';

type ProfileEditProps = {
    setShowCropper: (cropper: boolean) => void;
    preview: string | undefined;
    setPreview: (preview: string | undefined) => void;
    setAvatarFile: (file: File | null) => void;
    fieldInput: {
        fullName: string;
        setFullName: (fullName: string) => void;
        email: string;
        setEmail: (email: string) => void;
        organization: string;
        setOrganization: (organization: string) => void;
        bio: string;
        setBio: (bio: string) => void;
    };
};

const ProfileEdit: FC<ProfileEditProps> = ({
    preview,
    setAvatarFile,
    setPreview,
    setShowCropper,
    fieldInput: { bio, email, fullName, organization, setBio, setEmail, setFullName, setOrganization },
}) => {
    const { errors } = usePage().props;
    return (
        <div className="rounded-xl bg-white p-8 shadow-md dark:bg-gray-900">
            <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-start md:gap-6">
                <div className="md:flex-0">
                    <AvatarUploader
                        setShowCropper={setShowCropper}
                        preview={preview}
                        setPreview={setPreview}
                        onChange={(file) => setAvatarFile(file)}
                    />
                </div>

                <div className="w-full md:flex-1">
                    <div className="flex items-start justify-between">
                        <div className="text-left">
                            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{fullName}</h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{email}</p>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-500">{bio || 'A short status or tagline goes here.'}</p>
                        </div>
                        <div className="hidden md:block">
                            <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500">
                                Edit profile
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <Field nameField="name" label="Full name" value={fullName} onChange={setFullName} placeholder="Jane Doe" />
                        <Field label="Email" nameField="email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
                        <div>
                            <label className="mb-1 block text-left text-xs font-medium text-gray-700 dark:text-white">Organization / Role</label>
                            <input
                                value={organization}
                                onChange={(e) => setOrganization(e.target.value)}
                                placeholder="Company or role (optional)"
                                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                            />
                            {errors.organization && <p className="text-sm font-medium text-red-600">{errors.organization}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <label className="mb-1 block text-left text-xs font-medium text-gray-700 dark:text-white">Bio / About</label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Tell people about yourself"
                                className="h-24 w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                            />
                            {errors.bio && <p className="text-sm font-medium text-red-600">{errors.bio}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;
