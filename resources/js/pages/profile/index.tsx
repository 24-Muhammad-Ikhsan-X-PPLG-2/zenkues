import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { User } from '@/types/auth';
import AvatarUploader from '@/components/Profile/AvatarUploader';
import Field from '@/components/Profile/Field';
import { Link, router } from '@inertiajs/react';
import convertAndCompressImage from '@/lib/convertAndCompressImage';
import Cropper, { Area } from 'react-easy-crop';
import AvatarEditor from '@/components/Profile/AvatarEditor';
import getCroppedImg from '@/lib/getCroppedImg';
import useUploadAvatar from '@/hooks/useUploadAvatar';

type ProfileProps = {
    profile?: User;
};

const Profile: FC<ProfileProps> = ({ profile }) => {
    const {
        avatarFile,
        setShowCropper,
        setAvatarFile,
        setPreview,
        croppedAreaPixels,
        crop,
        setCrop,
        zoom,
        setZoom,
        onCropComplete,
        showCropper,
        preview,
    } = useUploadAvatar({ avatar: profile?.avatar });

    const [fullName, setFullName] = useState(profile?.name ?? 'User Name');
    const [email, setEmail] = useState(profile?.email ?? 'you@example.com');
    const [bio, setBio] = useState(profile?.bio ?? '');
    const [organization, setOrganization] = useState(profile?.organization ?? '');

    const handleSave = async () => {
        let avatar: File | null = null;
        if (avatarFile && croppedAreaPixels) {
            const croppedBlob = await getCroppedImg(URL.createObjectURL(avatarFile), croppedAreaPixels);
            const imageFile = new File([croppedBlob], `image-${Math.random()}.jpeg`, {
                type: 'image/jpeg',
            });
            const compressedImage = await convertAndCompressImage(imageFile, 400);
            avatar = compressedImage;
        }
        router.put('/profile/update', {
            name: fullName,
            avatar,
            bio,
            organization,
        });
    };
    return (
        <>
            <AvatarEditor
                avatarFile={avatarFile ?? null}
                setShowCropper={setShowCropper}
                setAvatarFile={setAvatarFile}
                setPreview={setPreview}
                followedAreaPixels={croppedAreaPixels}
                crop={crop}
                showCropper={showCropper}
                setCrop={setCrop}
                zoom={zoom}
                setZoom={setZoom}
                onCropComplete={onCropComplete}
            />
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 py-12">
                <div className="mx-auto w-full max-w-3xl">
                    <div className="rounded-xl bg-white p-8 shadow-md">
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
                                        <h1 className="text-xl font-semibold text-gray-900">{fullName}</h1>
                                        <p className="mt-1 text-sm text-gray-500">{email}</p>
                                        <p className="mt-2 text-sm text-gray-600">{bio || 'A short status or tagline goes here.'}</p>
                                    </div>
                                    <div className="hidden md:block">
                                        <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500">
                                            Edit profile
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-4 md:grid-cols-2">
                                    <Field label="Full name" value={fullName} onChange={setFullName} placeholder="Jane Doe" />
                                    <Field label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
                                    <div>
                                        <label className="mb-1 block text-left text-xs font-medium text-gray-700">Organization / Role</label>
                                        <input
                                            value={organization}
                                            onChange={(e) => setOrganization(e.target.value)}
                                            placeholder="Company or role (optional)"
                                            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="mb-1 block text-left text-xs font-medium text-gray-700">Bio / About</label>
                                        <textarea
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            placeholder="Tell people about yourself"
                                            className="h-24 w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-900">Account actions</h3>
                            <p className="mt-1 text-xs text-gray-500">Manage security and access for your account.</p>

                            <div className="mt-4 space-y-3">
                                <button className="w-full rounded-md border border-gray-200 bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Change password
                                </button>
                                <button className="w-full rounded-md border border-gray-200 bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Manage security settings
                                </button>
                                <button className="w-full rounded-md border border-gray-200 bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Logout
                                </button>
                                <div className="mt-2 border-t border-gray-100 pt-3">
                                    <button className="w-full rounded-md bg-white py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                                        Delete account
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-900">Preferences</h3>
                            <p className="mt-1 text-xs text-gray-500">Personalize your experience and data preferences.</p>

                            <div className="mt-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">Email updates</p>
                                        <p className="mt-1 text-xs text-gray-500">Receive product updates and announcements.</p>
                                    </div>
                                    <label className="inline-flex cursor-pointer items-center">
                                        <input type="checkbox" className="sr-only" defaultChecked />
                                        <span className="inline-block h-6 w-11 rounded-full bg-gray-200" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <Link href={'/dashboard'}>
                            <button className="cursor-pointer rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                Cancel
                            </button>
                        </Link>
                        <button
                            onClick={handleSave}
                            className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
