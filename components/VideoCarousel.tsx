'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Trash, SquarePen } from 'lucide-react';
import EditModal, { EditableVideo } from './EditVideoModal';
import { Toaster, toast } from 'react-hot-toast';

type Video = EditableVideo;

interface VideoCarouselProps {
    videos: Video[];
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {

    const supabase = createClient();
    const [isAdmin, setIsAdmin] = useState(false);
    const [videoItems, setVideoItems] = useState(videos);
    const [editingVideo, setEditingVideo] = useState<Video | null>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(1);

    // Handle window resize to determine visible items
    useEffect(() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth >= 1024) {
                setItemsPerPage(3); // lg
            } else if (window.innerWidth >= 768) {
                setItemsPerPage(2); // md
            } else {
                setItemsPerPage(1); // sm
            }
        };

        updateItemsPerPage(); // Initial calculation
        window.addEventListener('resize', updateItemsPerPage);

        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);

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
        const video = videoItems.find((item) => item.id === id);
        if (video) setEditingVideo(video);
    }

    const handleRemove = async (id: number) => {
        if (!window.confirm('Remove this video?')) return;

        const videoToDelete = videos.find((video) => video.id === id);

        if (videoToDelete?.image_url) {

            const fileName = videoToDelete.image_url.split('/').pop();
            const decoded = fileName ? decodeURIComponent(fileName) : undefined;

            if (decoded) {

                const { error } = await supabase.from('videos').delete().eq('id', id);
                if (error) {
                    toast.error(`Unable to remove video: ${error.message}`);
                    return;
                }
                else {
                    const { error } = await supabase.storage
                        .from('video_thumbnails')
                        .remove([decoded]);
                    if (error) {
                        toast.error(`Entry deleted from videos table. But there was an error removing the video thumbnail from the storage: ${error.message}`);
                    }
                    else {
                        toast.success('Video Deleted Successfully');
                    }
                }
            }

            setVideoItems((currentVideos) => currentVideos.filter((video) => video.id !== id));
            setCurrentIndex((currentIndex) => Math.min(currentIndex, Math.max(0, videoItems.length - 2)));
        }
    }

    const handleSave = async (updatedVideo: Video) => {
        const { error } = await supabase
            .from('videos')
            .update({
                client_name: updatedVideo.client_name,
                category: updatedVideo.category,
                video_url: updatedVideo.video_url,
                aspect_ratio: updatedVideo.aspect_ratio,
            })
            .eq('id', updatedVideo.id);

        if (error) throw new Error(error.message);

        setVideoItems((currentVideos) => currentVideos.map((video) => video.id === updatedVideo.id ? updatedVideo : video));
        setEditingVideo(null);
    }

    const totalItems = videoItems.length;
    // Calculate max index to prevent exposing empty space at the end of the track
    const maxIndex = Math.max(0, totalItems - itemsPerPage);

    // Navigation Logic
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
    };

    // Calculate how far to push the track based on current index and screen size
    const shiftPercentage = (currentIndex * 100) / itemsPerPage;

    return (
        // Outer flex container aligns buttons and the track side-by-side
        <div className="flex items-center justify-between w-full mx-auto gap-4 px-4">
            <Toaster />
            {/* Previous Button - Placed entirely outside the iframe container */}
            <button
                onClick={prevSlide}
                className="shrink-0 bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-full shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Previous Video"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            {/* Carousel Track Wrapper */}
            <div className="overflow-hidden w-full rounded-xl">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${shiftPercentage}%)` }}
                >
                    {videoItems.map((video) => (
                        <div key={video.id} className="w-full md:w-1/2 lg:w-1/3 shrink-0 p-2">
                            {/* Aspect-video maintains 16:9 ratio for iframes */}
                            <div
                                style={{ aspectRatio: video.aspect_ratio }}
                                className="group relative w-full bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-200"
                            >
                                <iframe
                                    src={video.video_url}
                                    title={`${video.client_name} - ${video.category}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full border-none"
                                ></iframe>
                                {isAdmin &&
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black group-active:bg-black/60 group-focus:bg-black/60 transition-colors duration-500 z-10 invisible cursor-pointer group-hover:visible flex flex-col justify-center items-center gap-4 md:gap-6 xl:gap-8 text-xl lg:text-2xl
                                text-white">
                                        <button type="button" onClick={() => handleEdit(video.id)} className='rounded-xl border border-white hover:bg-white hover:text-black cursor-pointer transition-colors duration-300 px-4 py-2 flex items-center gap-3'>Edit <SquarePen /></button>
                                        <button type="button" onClick={() => handleRemove(video.id)} className='rounded-xl border border-white hover:bg-logo hover:text-white cursor-pointer transition-colors duration-300 px-4 py-2 flex items-center gap-3'>Remove <Trash /></button>
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Next Button - Placed entirely outside the iframe container */}
            <button
                onClick={nextSlide}
                className="shrink-0 bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-full shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Next Video"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            {editingVideo && <EditModal video={editingVideo} onClose={() => setEditingVideo(null)} onSave={handleSave} />}
        </div>
    );
}