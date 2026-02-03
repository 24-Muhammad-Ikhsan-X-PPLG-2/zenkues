import { Area } from 'react-easy-crop';

export default async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<Blob> {
    const image = new Image();
    image.src = imageSrc;
    return new Promise((resolve, reject) => {
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return reject('Canvas context tidak ditemukan!');
            }
            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;
            ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        return reject(new Error('Failed create blob'));
                    }
                    resolve(blob);
                },
                'image/jpeg',
                0.95,
            );
        };
        image.onerror = (err) => reject(err);
    });
}
