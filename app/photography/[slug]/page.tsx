import { createClient } from '@/lib/supabase/server';
import PhotoGrid from '@/components/PhotoGrid';
import { mont } from '@/app/fonts';
import Link from 'next/link';

const initial = 12;

export default async function FolderPage({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;
    const supabase = await createClient();
    const { data: folders } = await supabase.from('folders').select('*');

    let folderName: string = "";

    if (folders !== null) {
        const folder = folders.find(f => f.name === decodeURIComponent(slug));
        folder ? folderName = folder.name : folderName = "";
    }

    const { data: photos, count, error } = await supabase
        .from('photos')
        .select('*', { count: 'exact' })
        .eq('folder', folderName)
        .order('created_at', { ascending: true })
        .range(0, initial - 1);

    if (error) {
        return (
            <div className="max-w-7xl mx-auto py-12 md:py-24 space-y-16 px-4 sm:px-6 lg:px-8 ">
                <h2 className={`font-semibold text-2xl text-center tracking-widest`}>{folderName}</h2>
                <p className='text-center mt-20 text-logo'>
                    Error fetching the photos
                </p>
            </div >
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-12 md:py-24 space-y-16 px-4 sm:px-6 lg:px-8 ">
            <h2 className={`font-semibold text-2xl text-center tracking-widest`}>{folderName}</h2>
            {
                folderName === "" ?
                    <div className='flex flex-col justify-center items-center gap-8'>
                        <p className='text-center mt-20 text-logo'>This folder does not exist
                        </p>
                        <Link href="/photography" className="bg-white text-logo px-4 py-2 rounded-3xl font-semibold hover:bg-logo hover:text-white hover:border-white border-2 transition duration-300 hover:cursor-pointer">
                            Back to photos
                        </Link>
                    </div> :
                    <PhotoGrid
                        folderName={folderName}
                        initialPhotos={photos ?? []}
                        totalCount={count ?? 0}
                        initialCount={initial}
                    />
            }
        </div >
    );
}