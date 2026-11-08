import { createClient } from "@/lib/supabase/server";
import Carousel from "./Carousel";

export default async function Photography() {
    const supabase = await createClient();
    const { data: photos, error } = await supabase
        .from('folders')
        .select('id, name, cover')
        .order('created_at', { ascending: false });

    if (error) {
        return (
            <div className="space-y-8 max-w-7xl mx-auto py-4">
                <h2 className={`font-light text-lg md:text-xl xl:text-2xl tracking-widest text-center`}>Photography</h2>
                <p className='text-center mt-20 text-logo'>
                    Error fetching the photos
                </p>
            </div>
        )
    }

    const carouselPhotos = (photos ?? []).map((photo) => ({
        id: photo.id,
        folder: photo.name,
        url: photo.cover
    }));

    return (
        <div className="space-y-8 max-w-7xl mx-auto py-4">
            <h2 className={`font-light text-lg md:text-xl xl:text-2xl tracking-widest text-center`}>Gallery</h2>
            <Carousel images={carouselPhotos} />
        </div>
    )
}
