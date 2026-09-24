import { createClient } from "@/lib/supabase/server";
import Carousel from "./Carousel";
import { mont } from "@/app/fonts";

export default async function Photography() {
    const supabase = await createClient();
    const { data: photos, error } = await supabase
        .from('photos')
        .select('id, title, client, folder, url')
        .order('created_at', { ascending: true });

    if (error) {
        return (
            <div className="space-y-8 max-w-7xl mx-auto py-4">
                <h2 className={`${mont.className} font-semibold text-lg md:text-xl lg:text-2xl tracking-widest text-center`}>Photography</h2>
                <p className='text-center mt-20 text-logo'>
                    Error fetching the photos
                </p>
            </div>
        )
    }

    const carouselPhotos = (photos ?? []).map((photo) => ({
        id: photo.id,
        title: photo.title,
        client: photo.client,
        folder: photo.folder,
        url: photo.url
    }));

    return (
        <div className="space-y-8 max-w-7xl mx-auto py-4">
            <h2 className={`${mont.className} font-semibold text-lg md:text-xl lg:text-2xl tracking-widest text-center`}>Photography</h2>
            <Carousel images={carouselPhotos} />
        </div>
    )
}
