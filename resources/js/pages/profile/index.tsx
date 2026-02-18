import { FC, useState } from 'react';
import { User } from '@/types/auth';
import AvatarUploader from '@/components/Profile/AvatarUploader';
import Field from '@/components/Profile/Field';
import { Link, router, usePage } from '@inertiajs/react';
import convertAndCompressImage from '@/lib/convertAndCompressImage';
import AvatarEditor from '@/components/Profile/AvatarEditor';
import getCroppedImg from '@/lib/getCroppedImg';
import useUploadAvatar from '@/hooks/useUploadAvatar';
import LogoutModal from '@/components/Dashboard/ModalLogout';
import ProfileEdit from '@/components/Profile/ProfileEdit';
import { ArrowLeft } from 'lucide-react';
import ModalDeleteAccont from './ModalDeleteAccont';
import Toggle from '@/components/Settings/Toggle';

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
    const [isLoading, setIsLoading] = useState(false);
    const [showModalLogout, setShowModalLogout] = useState(false);
    const [showModalDeleteAccount, setShowModalDeleteAccount] = useState(false);
    const {
        flash: { success, error },
    } = usePage().props;

    const [fullName, setFullName] = useState(profile?.name ?? 'User Name');
    const [email, setEmail] = useState(profile?.email ?? 'you@example.com');
    const [bio, setBio] = useState(profile?.bio ?? '');
    const [organization, setOrganization] = useState(profile?.organization ?? '');

    const handleSave = async () => {
        setIsLoading(true);
        let avatar: File | null = null;
        if (avatarFile && croppedAreaPixels) {
            const croppedBlob = await getCroppedImg(URL.createObjectURL(avatarFile), croppedAreaPixels);
            const imageFile = new File([croppedBlob], `image-${Math.random()}.jpeg`, {
                type: 'image/jpeg',
            });
            const compressedImage = await convertAndCompressImage(imageFile, 400);
            avatar = compressedImage;
        }
        router.put(
            '/profile/update',
            {
                name: fullName,
                avatar,
                bio,
                organization,
            },
            {
                onFinish: () => setIsLoading(false),
                preserveScroll: true,
                preserveState: true,
            },
        );
    };
    const handleOpenModalDeleteAccount = () => setShowModalDeleteAccount(true);
    return (
        <>
            <LogoutModal openModalLogout={showModalLogout} setOpenModalLogout={setShowModalLogout} handleLogout={() => router.delete('/logout')} />
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
            <ModalDeleteAccont setShow={setShowModalDeleteAccount} show={showModalDeleteAccount} />
            <div className="min-h-screen bg-white px-4 py-12 dark:bg-gray-900">
                <div
                    className="absolute top-5 left-5 cursor-pointer rounded-full bg-white/30 p-1 shadow backdrop-blur-md transition duration-200 hover:scale-105 hover:bg-slate-50 active:scale-80 dark:hover:bg-gray-800"
                    onClick={() => router.get('/dashboard')}
                >
                    <ArrowLeft className="size-7" />
                </div>
                <div className="mx-auto w-full max-w-3xl">
                    {success && (
                        <div className="mb-3 rounded-md bg-green-50 p-4 text-center shadow">
                            <p className="text-green-700">{success}</p>
                        </div>
                    )}
                    {error && (
                        <div className="mb-3 rounded-md bg-red-50 p-4 text-center shadow">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}
                    <ProfileEdit
                        preview={preview}
                        setPreview={setPreview}
                        setAvatarFile={setAvatarFile}
                        setShowCropper={setShowCropper}
                        fieldInput={{ bio, email, fullName, organization, setBio, setEmail, setFullName, setOrganization }}
                    />

                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Account actions</h3>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Manage security and access for your account.</p>

                            <div className="mt-4 flex flex-col gap-3">
                                <Link href={'/profile/change-password'}>
                                    <button className="w-full cursor-pointer rounded-md border border-gray-200 bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
                                        Change password
                                    </button>
                                </Link>
                                <button className="w-full cursor-pointer rounded-md border border-gray-200 bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
                                    Manage security settings
                                </button>
                                <button
                                    className="w-full cursor-pointer rounded-md border border-gray-200 bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
                                    onClick={() => setShowModalLogout(true)}
                                >
                                    Logout
                                </button>
                                <div className="mt-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                                    <button
                                        onClick={handleOpenModalDeleteAccount}
                                        className="w-full cursor-pointer rounded-md border border-gray-200 bg-white py-2 text-sm font-medium text-red-500 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
                                    >
                                        Delete account
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Preferences</h3>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Personalize your experience and data preferences.</p>

                            <div className="mt-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Email updates</p>
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Receive product updates and announcements.</p>
                                    </div>
                                    <Toggle checked={false} onChange={() => {}} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <Link disabled={isLoading} href={'/dashboard'}>
                            <button className="cursor-pointer rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
                                Cancel
                            </button>
                        </Link>
                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-400"
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
