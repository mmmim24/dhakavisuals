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
        console.error('Failed to fetch photos:', error.message);
    }

    const carouselPhotos = (photos ?? []).map((photo) => ({
        id: photo.id,
        title: photo.title,
        client: photo.client,
        folder: photo.folder,
        url: photo.url
    }));

    console.log(photos, error);
    return (
        <div className="space-y-8 w-full">
            <h2 className={`${mont.className} text-2xl tracking-widest text-center`}>Photography</h2>
            <Carousel images={carouselPhotos} />
        </div>
    )
}
