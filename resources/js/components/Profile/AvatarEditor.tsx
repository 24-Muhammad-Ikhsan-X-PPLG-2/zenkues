import getCroppedImg from '@/lib/getCroppedImg';
import React, { FC } from 'react';
import Cropper, { Area } from 'react-easy-crop';

type AvatarEditorProps = {
    setShowCropper: (show: boolean) => void;
    setAvatarFile: (file: File | null) => void;
    showCropper: boolean;
    avatarFile: File | null;
    crop: { x: number; y: number };
    setCrop: (crop: { x: number; y: number }) => void;
    zoom: number;
    setZoom: (zoom: number) => void;
    onCropComplete: (_croppedArea: Area, croppedAreaPixels: Area) => void;
    setPreview: (preview: string | undefined) => void;
    followedAreaPixels: Area | null;
};

const AvatarEditor: FC<AvatarEditorProps> = ({
    avatarFile,
    setShowCropper,
    showCropper,
    setAvatarFile,
    crop,
    setCrop,
    zoom,
    setZoom,
    onCropComplete,
    setPreview,
    followedAreaPixels,
}) => {
    if (!avatarFile || !showCropper) return <></>;
    return (
        <>
            <div className="fixed z-99 flex h-full w-full items-center justify-center bg-black/30 px-4 backdrop-blur-md">
                <div className="absolute top-5 left-5 flex items-center gap-4">
                    <button
                        className="cursor-pointer rounded-md bg-gray-500 px-4 py-2 text-white"
                        onClick={() => {
                            setShowCropper(false);
                            setAvatarFile(null);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="cursor-pointer rounded-md bg-green-500 px-4 py-2 text-white"
                        onClick={async () => {
                            if (!avatarFile || !followedAreaPixels) return;
                            let urlImage = URL.createObjectURL(avatarFile);
                            const croppedBlob = await getCroppedImg(urlImage, followedAreaPixels);
                            const image = new File([croppedBlob], `preview-${Math.random()}.jpeg}`, {
                                type: 'image/jpeg',
                            });
                            setPreview(URL.createObjectURL(image));
                            setShowCropper(false);
                        }}
                    >
                        Ok
                    </button>
                </div>
                <div className="relative h-[400px] w-full lg:w-96">
                    <Cropper
                        image={URL.createObjectURL(avatarFile)}
                        crop={crop}
                        zoom={zoom}
                        aspect={1 / 1}
                        cropShape="round"
                        showGrid={false}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        style={{ containerStyle: { borderRadius: '0.5rem', backgroundColor: 'white' } }}
                    />
                </div>
            </div>
        </>
    );
};

export default AvatarEditor;
