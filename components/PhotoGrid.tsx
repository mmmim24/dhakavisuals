'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { Photo } from './PhotoFolder';
import { Toaster, toast } from 'react-hot-toast';
import { SquarePen, Trash } from 'lucide-react';
import EditModal from './EditPhotoModal';

interface PhotoGridProps {
    slug: string;
    initialPhotos: Photo[];
    totalCount: number;
    initialCount: number;
}

export default function PhotoGrid({ slug, initialPhotos, totalCount, initialCount }: PhotoGridProps) {

    const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [count, setCount] = useState(totalCount);
    const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
    const supabase = createClient();

    const hasMore = photos.length < count;

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

    const handleSave = async (updatedPhoto: Photo) => {
        const { error } = await supabase
            .from('photos')
            .update({
                title: updatedPhoto.title,
                client: updatedPhoto.client,
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                    <div key={photo.id} className="group relative aspect-square rounded-md overflow-hidden">
                        <div>

                            <Image
                                src={photo.url}
                                alt={photo.title ?? ''}
                                fill
                                className="object-cover"
                                loading="lazy"
                            />
                        </div>
                        {isAdmin &&
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black group-active:bg-black/60 group-focus:bg-black/60 transition-colors duration-500 z-10 invisible group-hover:visible flex flex-col justify-center items-center gap-4 md:gap-6 xl:gap-8 text-xl lg:text-2xl
                                text-white">
                                <button type="button"
                                    onClick={() => handleEdit(photo.id)}
                                    className='rounded-xl border border-white hover:bg-white hover:text-black cursor-pointer transition-colors duration-300 px-4 py-2 flex items-center gap-3'>Edit <SquarePen /></button>
                                <button type="button" onClick={() => handleRemove(photo.id)} className='rounded-xl border border-white hover:bg-logo hover:text-white cursor-pointer transition-colors duration-300 px-4 py-2 flex items-center gap-3'>Remove <Trash /></button>
                            </div>
                        }
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