"use client";

import { useEffect, useState } from "react";
import { VideoCard } from "./VideoCard";
import { createClient } from "@/lib/supabase/client";

type VideoItem = {
    id: string;
    client_name: string;
    category: string;
    url: string;
};

export default function Videography() {
    const supabase = createClient();

    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function loadVideos() {
            const { data, error } = await supabase
                .from('thumbnail_videos')
                .select("id, client_name, category, url")
                .order("created_at", { ascending: true });

            if (!error && data) {
                setVideos(data);
                if (data.length > 6)
                    setVideos(data.slice(0, 5));
            }
            setLoading(false);
        }

        loadVideos();
    }, []);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto space-y-8 text-center">
                <h2 className={`font-light text-lg md:text-xl xl:text-2xl tracking-widest`}>
                    Videography
                </h2>
                <p className="text-gray-400">Loading videos...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <h2 className={`font-light text-lg md:text-xl xl:text-2xl text-center tracking-widest`}>
                Video Production
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>

        </div>
    );
}