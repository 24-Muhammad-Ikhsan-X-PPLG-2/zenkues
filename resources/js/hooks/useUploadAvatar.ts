import { useCallback, useState } from 'react';
import { Area } from 'react-easy-crop';

const useUploadAvatar = ({ avatar }: { avatar: string | undefined }) => {
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [showCropper, setShowCropper] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const [preview, setPreview] = useState<string | undefined>(avatar);

    const onCropComplete = useCallback((_followedArea: Area, followedAreaPixels: Area) => {
        setCroppedAreaPixels(followedAreaPixels);
    }, []);

    return {
        avatarFile,
        setAvatarFile,
        crop,
        setCrop,
        showCropper,
        setShowCropper,
        zoom,
        setZoom,
        croppedAreaPixels,
        preview,
        setPreview,
        onCropComplete,
    };
};

export default useUploadAvatar;
