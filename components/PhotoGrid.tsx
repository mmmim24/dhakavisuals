'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { Toaster, toast } from 'react-hot-toast';
import { SquarePen, Trash } from 'lucide-react';
import EditModal from './EditPhotoModal';

export interface IPhoto {
    id: number;
    folder: string;
    url: string;
}

const MAX_PHOTOS_PER_ROW = 3;
const TARGET_ROW_HEIGHT = 240;
const PHOTO_GAP = 8;

function getPhotoRows(photos: IPhoto[], photoRatios: Record<number, number>, containerWidth: number) {
    const costs: number[] = Array.from({ length: photos.length + 1 }, () => Number.POSITIVE_INFINITY);
    const rowSizes: number[] = Array.from({ length: photos.length }, () => 1);
    costs[photos.length] = 0;

    for (let start = photos.length - 1; start >= 0; start--) {
        let aspectRatioSum = 0;

        for (let size = 1; size <= MAX_PHOTOS_PER_ROW && start + size <= photos.length; size++) {
            aspectRatioSum += photoRatios[photos[start + size - 1].id] ?? 1;
            const rowHeight = Math.max(1, containerWidth - PHOTO_GAP * (size - 1)) / aspectRatioSum;
            const heightDeviation = Math.log(rowHeight / TARGET_ROW_HEIGHT);
            const cost = heightDeviation ** 2 + costs[start + size];

            if (cost < costs[start]) {
                costs[start] = cost;
                rowSizes[start] = size;
            }
        }
    }

    const rows: IPhoto[][] = [];
    for (let start = 0; start < photos.length;) {
        const size = rowSizes[start];
        rows.push(photos.slice(start, start + size));
        start += size;
    }

    return rows;
}

interface PhotoGridProps {
    folderName: string;
    initialPhotos: IPhoto[];
    totalCount: number;
    initialCount: number;
}

export default function PhotoGrid({ folderName, initialPhotos, totalCount, initialCount }: PhotoGridProps) {

    const [photos, setPhotos] = useState<IPhoto[]>(initialPhotos);
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [draggingFiles, setDraggingFiles] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadFeedback, setUploadFeedback] = useState<{ message: string; isError: boolean } | null>(null);
    const [count, setCount] = useState(totalCount);
    const [editingPhoto, setEditingPhoto] = useState<IPhoto | null>(null);
    const [photoRatios, setPhotoRatios] = useState<Record<number, number>>({});
    const [containerWidth, setContainerWidth] = useState(0);
    const gridRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const supabase = useMemo(() => createClient(), []);

    const hasMore = photos.length < count;
    const rows = getPhotoRows(photos, photoRatios, containerWidth || 1024);

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        const observer = new ResizeObserver(([entry]) => {
            setContainerWidth(entry.contentRect.width);
        });

        observer.observe(grid);
        return () => observer.disconnect();
    }, []);

    async function loadMore() {
        setLoading(true);

        const { data } = await supabase
            .from('photos')
            .select('*')
            .eq('folder', folderName)
            .order('created_at', { ascending: true })
            .range(photos.length, photos.length + initialCount - 1);

        if (data) {
            setPhotos((prev) => [...prev, ...data]);
        }

        setLoading(false);
    }

    useEffect(() => {
        async function isAdmin() {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) {
                setIsAdmin(false);
            }
            else {
                setIsAdmin(true);
            }
        }

        isAdmin();
    }, [supabase]);

    async function uploadPhotos(selectedFiles: FileList | File[]) {
        const files = Array.from(selectedFiles);
        if (files.length === 0 || uploading) return;

        setUploading(true);
        setUploadFeedback(null);

        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError || !user) {
                setIsAdmin(false);
                throw new Error('You must be signed in to upload photos');
            }

            const uploadedPhotos: IPhoto[] = [];
            const failures: string[] = [];

            for (const file of files) {
                if (!file.type.startsWith('image/')) {
                    failures.push(`${file.name}: only image files are supported.`);
                    continue;
                }

                const extensionIndex = file.name.lastIndexOf('.');
                const extension = extensionIndex > 0
                    ? file.name.slice(extensionIndex + 1).replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
                    : '';
                const baseName = (extensionIndex > 0 ? file.name.slice(0, extensionIndex) : file.name)
                    .replace(/[^a-zA-Z0-9_-]+/g, '_') || 'photo';
                const safeFolder = folderName.replace(/[^a-zA-Z0-9_-]+/g, '_');
                const fileName = `${baseName}_${safeFolder}_${crypto.randomUUID()}${extension ? `.${extension}` : ''}`;

                try {
                    const { error: storageError } = await supabase.storage
                        .from('photos')
                        .upload(fileName, file, {
                            cacheControl: '63072000, immutable',
                            upsert: false,
                        });

                    if (storageError) {
                        failures.push(`${file.name}: ${storageError.message}`);
                        continue;
                    }

                    const { data: urlData } = supabase.storage
                        .from('photos')
                        .getPublicUrl(fileName);
                    const { data: photo, error: insertError } = await supabase
                        .from('photos')
                        .insert({ folder: folderName, url: urlData.publicUrl })
                        .select('id, folder, url')
                        .single();

                    if (insertError || !photo) {
                        const { error: cleanupError } = await supabase.storage
                            .from('photos')
                            .remove([fileName]);
                        const cleanupMessage = cleanupError ? ` Storage cleanup failed: ${cleanupError.message}` : '';
                        failures.push(`${file.name}: ${insertError?.message ?? 'Unable to save photo record.'}${cleanupMessage}`);
                        continue;
                    }

                    uploadedPhotos.push(photo);
                } catch (error) {
                    failures.push(`${file.name}: ${error instanceof Error ? error.message : 'Upload failed.'}`);
                }
            }

            if (uploadedPhotos.length > 0) {
                setPhotos((currentPhotos) => [...currentPhotos, ...uploadedPhotos]);
                setCount((currentCount) => currentCount + uploadedPhotos.length);
            }

            const summary = `Uploaded ${uploadedPhotos.length} of ${files.length} photos.${failures.length ? ` ${failures.join(' ')}` : ''}`;
            setUploadFeedback({ message: summary, isError: failures.length > 0 });
        } catch (error) {
            setUploadFeedback({
                message: error instanceof Error ? error.message : 'Unable to upload photos.',
                isError: true,
            });
        } finally {
            setUploading(false);
        }
    }

    const handleEdit = (id: number) => {
        const photo = photos.find((item) => item.id === id);
        if (photo) setEditingPhoto(photo);
    }

    const handleRemove = async (id: number) => {
        if (!window.confirm('Remove this photo?')) return;

        const photoToDelete = photos.find((photo) => photo.id === id);

        if (photoToDelete?.url) {

            const fileName = photoToDelete.url.split('/').pop();
            const decoded = fileName ? decodeURIComponent(fileName) : undefined;

            if (decoded) {

                const { error } = await supabase.from('photos').delete().eq('id', id);
                if (error) {
                    toast.error(`Unable to remove photo: ${error.message}`);
                    return;
                }
                else {
                    const { error } = await supabase.storage
                        .from('portfolio_photos')
                        .remove([decoded]);
                    if (error) {
                        toast.error(`Entry deleted from photos table. But there was an error removing the photo from the storage: ${error.message}`);
                    }
                    else {
                        toast.success('Photo Deleted Successfully');
                    }
                }
            }
        }

        setCount((currentCount) => Math.max(0, currentCount - 1));
        setPhotos((currentPhotos) => currentPhotos.filter((photo) => photo.id !== id));
    }

    const handleSave = async (updatedPhoto: IPhoto) => {
        const { error } = await supabase
            .from('photos')
            .update({
                folder: updatedPhoto.folder,
                url: updatedPhoto.url,
            })
            .eq('id', updatedPhoto.id);

        if (error) throw new Error(error.message);

        setPhotos((currentPhotos) => currentPhotos.map((photo) => photo.id === updatedPhoto.id ? updatedPhoto : photo));
        setEditingPhoto(null);
    }

    return (
        <div>
            <Toaster />
            {isAdmin && (
                <section className="mb-10" aria-label="Upload photos">
                    <div
                        onDragOver={(event) => {
                            event.preventDefault();
                            setDraggingFiles(true);
                        }}
                        onDragLeave={() => setDraggingFiles(false)}
                        onDrop={(event) => {
                            event.preventDefault();
                            setDraggingFiles(false);
                            void uploadPhotos(event.dataTransfer.files);
                        }}
                        className={`rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
                            draggingFiles ? 'border-logo bg-logo/10' : 'border-zinc-400'
                        } ${uploading ? 'opacity-60' : ''}`}
                    >
                        <p className="font-semibold">Drag and drop photos into this album</p>
                        <p className="mt-2 text-sm text-neutral-500">You can select or drop multiple image files.</p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            disabled={uploading}
                            className="sr-only"
                            onChange={(event) => {
                                void uploadPhotos(event.currentTarget.files ?? []);
                                event.currentTarget.value = '';
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="mt-4 rounded-md bg-logo px-4 py-2 text-white disabled:opacity-50"
                        >
                            {uploading ? 'Uploading photos...' : 'Choose photos'}
                        </button>
                        {uploadFeedback && (
                            <p
                                className={`mt-4 text-sm ${uploadFeedback.isError ? 'text-red-600' : 'text-green-700'}`}
                                role={uploadFeedback.isError ? 'alert' : 'status'}
                            >
                                {uploadFeedback.message}
                            </p>
                        )}
                    </div>
                </section>
            )}

            <div ref={gridRef} className="flex flex-col gap-2">
                {photos.length === 0 && <p className="text-center mt-20 text-logo">No photo in this album</p>}
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex w-full items-start gap-2">
                        {row.map((photo) => {
                            const ratio = photoRatios[photo.id] ?? 1;

                            return (
                                <div
                                    key={photo.id}
                                    className="group relative min-w-0 overflow-hidden rounded-md"
                                    style={{ flex: `${ratio} 1 0%`, aspectRatio: ratio }}
                                >
                                    <Image
                                        src={photo.url}
                                        alt={photo.folder ?? ''}
                                        fill
                                        className="object-contain"
                                        loading="lazy"
                                        sizes={`${Math.ceil(100 / row.length)}vw`}
                                        onLoad={(event) => {
                                            const { naturalWidth, naturalHeight } = event.currentTarget;
                                            if (naturalWidth && naturalHeight) {
                                                const ratio = naturalWidth / naturalHeight;
                                                setPhotoRatios((current) => (
                                                    current[photo.id] === ratio
                                                        ? current
                                                        : { ...current, [photo.id]: ratio }
                                                ));
                                            }
                                        }}
                                    />
                                    {isAdmin &&
                                        <div className="absolute inset-0 z-10 invisible flex flex-col items-center justify-center gap-4 bg-black/20 text-xl text-white transition-colors duration-500 group-hover:visible group-hover:bg-black group-active:bg-black/60 group-focus:bg-black/60 md:gap-6 lg:text-2xl xl:gap-8">
                                            <button type="button"
                                                onClick={() => handleEdit(photo.id)}
                                                className='flex cursor-pointer items-center gap-3 rounded-xl border border-white px-4 py-2 transition-colors duration-300 hover:bg-white hover:text-black'>Edit <SquarePen /></button>
                                            <button type="button" onClick={() => handleRemove(photo.id)} className='flex cursor-pointer items-center gap-3 rounded-xl border border-white px-4 py-2 transition-colors duration-300 hover:bg-logo hover:text-white'>Remove <Trash /></button>
                                        </div>
                                    }
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center mt-16">
                    <button
                        onClick={loadMore}
                        disabled={loading}
                        className="px-4 py-2 rounded-full border bg-black border-black hover:bg-white text-white hover:text-black transition-colors duration-500 cursor-pointer disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            )}

            {editingPhoto && <EditModal photo={editingPhoto} onClose={() => setEditingPhoto(null)} onSave={handleSave} />}
        </div>
    );
}