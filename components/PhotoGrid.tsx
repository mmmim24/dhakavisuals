'use client';

import { useState, useEffect, useRef } from 'react';
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
    slug: string;
    initialPhotos: IPhoto[];
    totalCount: number;
    initialCount: number;
}

export default function PhotoGrid({ slug, initialPhotos, totalCount, initialCount }: PhotoGridProps) {

    const [photos, setPhotos] = useState<IPhoto[]>(initialPhotos);
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [count, setCount] = useState(totalCount);
    const [editingPhoto, setEditingPhoto] = useState<IPhoto | null>(null);
    const [photoRatios, setPhotoRatios] = useState<Record<number, number>>({});
    const [containerWidth, setContainerWidth] = useState(0);
    const gridRef = useRef<HTMLDivElement>(null);
    const supabase = createClient();

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
            .eq('folder', slug)
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
    }, []);

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

        setCount(photos.length - 1);
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

    if (photos.length === 0) return <div><p className='text-center mt-20 text-logo'>No photo in this album</p></div>

    return (
        <div>
            <Toaster />
            <div ref={gridRef} className="flex flex-col gap-2">
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