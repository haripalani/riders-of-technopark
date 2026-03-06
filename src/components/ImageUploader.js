import { useRef, useState, useCallback } from 'react';
import { Upload, Link, Crop, X, Check } from 'lucide-react';
import Cropper from 'react-easy-crop';

const ImageUploader = ({ value, onChange, label, preview = true, previewHeight = "h-48", aspectRatio = 16 / 9 }) => {
    const fileInputRef = useRef(null);
    const [showCropper, setShowCropper] = useState(false);
    const [imageToCrop, setImageToCrop] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.src = url;
        });

    const getCroppedImg = async (imageSrc, pixelCrop) => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Automatic Downscaling to keep Base64 strings lean
        const MAX_WIDTH = 1200;
        const scaleFactor = Math.min(1, MAX_WIDTH / pixelCrop.width);

        canvas.width = pixelCrop.width * scaleFactor;
        canvas.height = pixelCrop.height * scaleFactor;

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            canvas.width,
            canvas.height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    resolve(reader.result);
                };
            }, 'image/jpeg', 0.85); // Optimized compression
        });
    };

    const convertUrlToBase64 = async (url) => {
        if (!url || url.startsWith('data:')) return;

        try {
            const image = await createImage(url);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Re-use downscaling for URLs too
            const MAX_WIDTH = 1200;
            const ratio = Math.min(1, MAX_WIDTH / image.width);

            canvas.width = image.width * ratio;
            canvas.height = image.height * ratio;

            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            const base64 = canvas.toDataURL('image/jpeg', 0.85);
            onChange(base64);
        } catch (error) {
            console.error('Failed to convert URL to Base64:', error);
            alert('Could not convert this URL. It might have CORS restrictions. Try downloading and uploading instead.');
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageToCrop(reader.result);
                setShowCropper(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCropSave = async () => {
        if (imageToCrop && croppedAreaPixels) {
            const croppedImage = await getCroppedImg(imageToCrop, croppedAreaPixels);
            onChange(croppedImage);
            setShowCropper(false);
            setImageToCrop(null);
        }
    };

    const handleCropCancel = () => {
        setShowCropper(false);
        setImageToCrop(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
    };

    const handleUrlChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div>
            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                {label}
            </label>

            {/* Cropper Modal */}
            {showCropper && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 max-w-4xl w-full rounded-lg overflow-hidden border-2 border-rot-red">
                        <div className="flex justify-between items-center p-4 border-b border-zinc-800">
                            <h3 className="text-white font-bold uppercase tracking-wider">Crop Image</h3>
                            <button
                                onClick={handleCropCancel}
                                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="relative h-96 bg-black">
                            <Cropper
                                image={imageToCrop}
                                crop={crop}
                                zoom={zoom}
                                aspect={aspectRatio}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>

                        <div className="p-4 bg-zinc-950 space-y-4">
                            <div>
                                <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">
                                    Zoom
                                </label>
                                <input
                                    type="range"
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={zoom}
                                    onChange={(e) => setZoom(e.target.value)}
                                    className="w-full"
                                />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={handleCropCancel}
                                    className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 transition-colors text-white font-bold uppercase tracking-wider cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCropSave}
                                    className="flex-1 px-6 py-3 bg-rot-red hover:bg-red-800 transition-colors text-white font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <Check size={18} />
                                    Apply Crop
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab-like buttons */}
            <div className="flex gap-2 mb-3">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-zinc-700 hover:border-rot-red cursor-pointer"
                >
                    <Upload size={16} />
                    Upload & Crop
                </button>
                <div className="flex-1 flex items-center justify-between gap-2 px-4 py-2 bg-zinc-800 border-2 border-zinc-700 text-sm font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                        <Link size={16} className="text-gray-400" />
                        <span className="text-gray-400">or Use URL</span>
                    </div>
                    {value && !value.startsWith('data:') && (
                        <button
                            type="button"
                            onClick={() => convertUrlToBase64(value)}
                            className="text-[10px] bg-rot-red/20 hover:bg-rot-red text-rot-red hover:text-white px-2 py-1 transition-all border border-rot-red/50 cursor-pointer"
                        >
                            Convert to Local
                        </button>
                    )}
                </div>
            </div>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
            />

            {/* URL Input */}
            <input
                type="text"
                value={value || ''}
                onChange={handleUrlChange}
                className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none"
                placeholder="Or paste image URL here..."
            />

            {/* Preview */}
            {preview && value && (
                <div className="mt-4 relative group">
                    <img
                        src={value}
                        alt="Preview"
                        className={`w-full ${previewHeight} object-cover border-2 border-zinc-800`}
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                    {value.startsWith('data:image') && (
                        <button
                            onClick={() => {
                                setImageToCrop(value);
                                setShowCropper(true);
                            }}
                            className="absolute top-2 right-2 bg-rot-red text-white px-3 py-1 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 cursor-pointer"
                        >
                            <Crop size={14} />
                            Re-crop
                        </button>
                    )}
                </div>
            )}

            {/* Info text */}
            <p className="mt-2 text-xs text-gray-500">
                {value?.startsWith('data:image')
                    ? '✓ Using local uploaded image (click image to re-crop)'
                    : value
                        ? '✓ Using image from URL'
                        : 'Upload a file or paste a URL'}
            </p>
        </div>
    );
};

export default ImageUploader;
