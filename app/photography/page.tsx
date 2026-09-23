import { createClient } from '@/lib/supabase/server';
import PhotoFolder from '@/components/PhotoFolder';
import { mont } from '../fonts';

export default async function Photography() {
    const supabase = await createClient();

    const { data: arcThumbnail, error: arcThumbnailError } = await supabase
        .from('photos')
        .select('*')
        .eq('folder', 'architecture').limit(1);

    const { data: docThumbnail, error: docThumbnailError } = await supabase
        .from('photos')
        .select('*')
        .eq('folder', 'documentary').limit(1);

    const { data: edThumbnail, error: edThumbnailError } = await supabase
        .from('photos')
        .select('*')
        .eq('folder', 'edinst').limit(1);

    const { data: eventThumbnail, error: eventThumbnailError } = await supabase
        .from('photos')
        .select('*')
        .eq('folder', 'event').limit(1);

    const Folders = [
        {
            name: "Architecture & Interior",
            slug: "architecture",
            thumbnail: arcThumbnail,
            error: arcThumbnailError
        },
        {
            name: "Documentary",
            slug: "documentary",
            thumbnail: docThumbnail,
            error: docThumbnailError
        },
        {
            name: "Educational Institutions",
            slug: "edinst",
            thumbnail: edThumbnail,
            error: edThumbnailError
        },
        {
            name: "Event",
            slug: "event",
            thumbnail: eventThumbnail,
            error: eventThumbnailError
        }
    ]

    return (
        <div className="max-w-7xl min-h-screen mx-auto flex flex-col items-center gap-16 py-16 md:py-32">
            <h2 className={`${mont.className} font-semibold text-2xl text-center tracking-widest`}>Photography</h2>
            <PhotoFolder folders={Folders} />
        </div >
    )
}
