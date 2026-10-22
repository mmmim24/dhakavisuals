"use client";

import { useRef, useState, useEffect } from "react";
import { SquarePen, Trash } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

type VideoItem = {
    id: string;
    client_name: string;
    category: string;
    url: string;
};

export function VideoCard({ video }: { video: VideoItem }) {

    const supabase = createClient();
    const [isAdmin, setIsAdmin] = useState(false);

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

    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const startVideo = () => {
        const el = videoRef.current;
        if (!el) {
            console.log("no video element, thumbnail_video is:", video.url);
            return;
        }
        el.muted = true;
        el.play().catch((err) => {
            console.log("play failed:", err.name, err.message);
        });
    };

    const stopVideo = () => {
        const el = videoRef.current;
        if (!el) return;
        el.pause();
        el.currentTime = 0;
        setIsPlaying(false);
    };

    const handleVideoPage = () => {
        if (!isAdmin)
            router.push('/videography');
    };

    function handleEdit() {
        console.log('editing...')
    }

    async function handleRemove() {
        if (!window.confirm('Remove this video?')) return;

        const fileName = video.url.split('/').pop();
        const decoded = fileName ? decodeURIComponent(fileName) : undefined;

        if (decoded) {
            const { error: storageError } = await supabase.storage.from('thumbnail_videos').remove([decoded]);
            if (storageError) {
                toast.error(`Unable to remove video from storage`);
                return;
            }
            else {
                const { error: databaseError } = await supabase.from('thumbnail_videos').delete().eq('id', video.id);
                if (databaseError) {
                    toast.error(`Unable to remove videofrom database`);
                    return;
                } else {
                    toast.success('Video Deleted Successfully');
                    window.location.reload();
                }
            }
        }

    }

    return (
        <div
            onClick={handleVideoPage}
            onMouseEnter={stopVideo}
            onMouseLeave={startVideo}
            onFocus={stopVideo}
            onBlur={startVideo}
            tabIndex={0}
            className="group relative aspect-video sm:aspect-square lg:aspect-4/5 rounded-2xl overflow-hidden cursor-pointer focus:outline-none"
        >
            <Toaster />
            {video.url && (
                <video
                    autoPlay
                    ref={videoRef}
                    src={video.url}
                    poster={video.url}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onPlaying={() => setIsPlaying(true)}
                    onError={(e) => console.log("video error:", e.currentTarget.error)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-100"
                        }`}
                />
            )}

            <div className="absolute inset-0 bg-transparent group-hover:bg-black/60 group-focus:bg-black/60 transition-colors duration-500 z-10"></div>

            {isAdmin ?
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black group-active:bg-black/60 group-focus:bg-black/60 transition-colors duration-500 z-10 invisible cursor-pointer group-hover:visible flex flex-col justify-center items-center gap-4 md:gap-6 xl:gap-8 text-xl lg:text-2xl
                                text-white">
                    <button type="button"
                        onClick={() => handleEdit()}
                        className='rounded-xl border border-white hover:bg-white hover:text-black cursor-pointer transition-colors duration-300 px-4 py-2 flex items-center gap-3'>Edit <SquarePen /></button>
                    <button type="button"
                        onClick={() => handleRemove()}
                        className='rounded-xl border border-white hover:bg-logo hover:text-white cursor-pointer transition-colors duration-300 px-4 py-2 flex items-center gap-3'>Remove <Trash /></button>
                </div> :

                <div className="absolute text-left inset-0 p-8 flex flex-col justify-end z-20 opacity-100 translate-y-0 bg-black/60 sm:bg-transparent sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus:opacity-100 sm:translate-y-4 sm:group-hover:translate-y-0 transition-all duration-500">
                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                        {video.client_name}
                    </h3>
                    <div className="h-px w-12 bg-logo/50 my-4"></div>
                    <p className="text-gray-300 text-sm mb-4">{video.category}</p>
                </div>
            }

        </div>
    );
}