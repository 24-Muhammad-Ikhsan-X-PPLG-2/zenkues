import imageCompression from 'browser-image-compression';

export default async function convertAndCompressImage(file: File, maxWidthOrHeight: number = 400) {
    try {
        const compressedFile = await imageCompression(file, {
            maxSizeMB: 1,
            maxWidthOrHeight,
            useWebWorker: true,
            fileType: 'image/webp',
        });
        const fileJadi = new File([compressedFile], `${file.name.split('.')[0]}.webp`, { type: 'image/webp' });
        return fileJadi;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(`Image conversion and compression failed: ${err.message}`);
        } else {
            throw new Error('Image conversion and compression failed: Unknown error');
        }
    }
}
