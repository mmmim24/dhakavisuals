"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type VideoItem = {
    id: string;
    client_name: string;
    category: string;
    image_url: string;
    thumbnail_video?: string;
};

export function VideoCard({ video }: { video: VideoItem }) {
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const startVideo = () => {
        const el = videoRef.current;
        if (!el) {
            console.log("no video element, thumbnail_video is:", video.thumbnail_video);
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
        router.push('/videography');
    };

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

            <Image
                className="absolute inset-0 w-full h-full object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={video.image_url}
                loading="eager"
                alt={`${video.client_name} - ${video.category}`}
            />

            {video.thumbnail_video && (
                <video
                    autoPlay
                    ref={videoRef}
                    src={video.thumbnail_video}
                    poster={video.image_url}
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

            <div className="absolute text-left inset-0 p-8 flex flex-col justify-end z-20 opacity-100 translate-y-0 bg-black/60 sm:bg-transparent sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus:opacity-100 sm:translate-y-4 sm:group-hover:translate-y-0 transition-all duration-500">
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                    {video.client_name}
                </h3>
                <div className="h-px w-12 bg-logo/50 my-4"></div>
                <p className="text-gray-300 text-sm mb-4">{video.category}</p>
            </div>
        </div>
    );
}