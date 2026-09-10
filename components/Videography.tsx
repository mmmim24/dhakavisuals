"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mont } from "@/app/fonts";
import { createClient } from "@/lib/supabase/client";

type VideoItem = {
    id: string;
    client_name: string;
    category: string;
    thumbnail_image: string;
};

export default function Videography() {
    const supabase = createClient();
    const router = useRouter();

    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadVideos() {
            const { data, error } = await supabase
                .from("video")
                .select("id, client_name, category, thumbnail_image")
                .order("created_at", { ascending: true });

            if (!error && data) {
                setVideos(data);
            }
            setLoading(false);
        }

        loadVideos();
    }, []);

    const handleVideoPage = () => {
        router.push('/videography');
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto space-y-8">
                <h2 className={`${mont.className} text-2xl text-center tracking-widest`}>
                    Videography
                </h2>
                <p className="text-center text-gray-400">Loading videos...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <h2 className={`${mont.className} text-2xl text-center tracking-widest`}>
                Videography
            </h2>

            <div onClick={handleVideoPage} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                    <div
                        key={video.id}
                        className="group relative aspect-4/5 rounded-2xl overflow-hidden cursor-pointer focus:outline-none"
                    >
                        <Image
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-120 group-active:scale-105 group-focus:scale-105"
                            fill
                            src={video.thumbnail_image}
                            loading="eager"
                            alt={`${video.client_name} - ${video.category}`}
                        />

                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 group-active:bg-black/60 group-focus:bg-black/60 transition-colors duration-500 z-10"></div>

                        <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 opacity-100 translate-y-0 bg-black/60 md:bg-black/20 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500">
                            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                                {video.client_name}
                            </h3>
                            <div className="h-px w-12 bg-logo/50 my-4"></div>
                            <p className="text-gray-300 text-sm mb-4">{video.category}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}