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
        <div className="max-w-350 min-h-screen mx-auto flex flex-col items-center gap-16 py-16 md:py-32">
            <h2 className={`font-semibold text-2xl text-center tracking-widest`}>Video Production</h2>
            <p className='text-center mt-20 text-logo'>
                Error fetching the videos
            </p>
        </div>
    }

    const carouselVideos = (videos ?? []).map((video) => ({
        id: video.id,
        url: video.url,
        ratio: video.ratio
    }));

    return (
        <div className="max-w-350 min-h-screen mx-auto flex flex-col items-center gap-16 py-16 md:py-32">
            <h2 className={`font-semibold text-2xl text-center tracking-widest`}>Video Production</h2>
            <VideoCarousel videos={carouselVideos} />
        </div>
    )
}
