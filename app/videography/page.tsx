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
        clientName: video.client_name,
        category: video.category,
        embedUrl: video.video_url,
        aspect: video.aspect_ratio
    }));

    // console.log(videos, error);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-8">
            <h2 className={`${mont.className} font-semibold text-2xl text-center tracking-widest`}>Videography</h2>
            <VideoCarousel videos={carouselVideos} />
        </div>
    )
}
