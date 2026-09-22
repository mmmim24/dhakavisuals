'use client';

import { useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { Photo } from './PhotoFolder';

interface PhotoGridProps {
    slug: string;
    initialPhotos: Photo[];
    totalCount: number;
    initialCount: number;
}

export default function PhotoGrid({ slug, initialPhotos, totalCount, initialCount }: PhotoGridProps) {

    const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    const hasMore = photos.length < totalCount;

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

    if (photos.length === 0) return <div><p className='text-center mt-20 text-logo'>No photo in this album</p></div>

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                    <div key={photo.id} className="relative aspect-square rounded-md overflow-hidden">
                        <Image
                            src={photo.url}
                            alt={photo.title ?? ''}
                            fill
                            className="object-cover"
                            loading="lazy"
                        />
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
        </div>
    );
}