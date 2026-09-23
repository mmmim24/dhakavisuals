import VideoCarousel from '@/components/VideoCarousel';
import { createClient } from '@/lib/supabase/server';
import { mont } from '../fonts';

export default async function Videography() {
    const supabase = await createClient();
    const { data: videos, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Failed to fetch videos:', error.message);
    }

    const carouselVideos = (videos ?? []).map((video) => ({
        id: video.id,
        client_name: video.client_name,
        category: video.category,
        video_url: video.video_url,
        image_url: video.image_url,
        aspect_ratio: video.aspect_ratio
    }));

    return (
        <div className="max-w-350 min-h-screen mx-auto flex flex-col items-center gap-16 py-16 md:py-32">
            <h2 className={`${mont.className} font-semibold text-2xl text-center tracking-widest`}>Videography</h2>
            <VideoCarousel videos={carouselVideos} />
        </div>
    )
}
